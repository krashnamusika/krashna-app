import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import mailgun from 'nodemailer-mailgun-transport'
import {
    BCRYPT_SALT_ROUNDS,
    NUM_RANDOM_BYTES_IN_TOKEN,
} from '../config/authSettings'
import User from '../models/User'

require('dotenv').config()

const mailgunAuth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    },
}

const nodemailerMailgun = nodemailer.createTransport(mailgun(mailgunAuth))

export default function passwordRoutes(router) {
    router.post('/password/forgot', (req, res, next) => {
        if (!req.body.email) {
            res.send('Email required')
        }
        console.log(req.body.email)

        User.findOne({
            email: req.body.email,
        }).exec((error, user) => {
            if (error) {
                console.error('Error while looking up user in DB: ' + error)
                res.status(500).json(
                    'Failed to send recovery email due to DB error'
                )
                return
            }

            if (user) {
                const token = crypto
                    .randomBytes(NUM_RANDOM_BYTES_IN_TOKEN)
                    .toString('hex')
                user.set({
                    resetPasswordToken: token,
                    resetPasswordTokenExpires: Date.now() + 86400000, // 24 hours from now
                })

                user.save(function(saveError, updatedUser) {
                    if (saveError) {
                        console.error(saveError)
                    }

                    nodemailerMailgun.sendMail(
                        {
                            from: process.env.FROM_EMAIL
                                ? process.env.FROM_EMAIL
                                : 'demoEmail@gmail.com',
                            to: user.email,
                            subject: '[krashna] Link To Reset Password',
                            text: `
You are receiving this message because you (or someone else) have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process within 24 hours of receiving it:\n\n
${
                                process.env.BASE_URL
                                    ? process.env.BASE_URL
                                    : 'http://localhost:3000'
                            }/reset-password?token=${token}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`.trim(),
                        },
                        (err, info) => {
                            if (err) {
                                console.error(`Error: ${err}`)
                                res.status(500).json(
                                    'Failed to send recovery email'
                                )
                            } else {
                                console.log(`Response: ${info}`)
                                res.status(200).json('Recovery email sent')
                            }
                        }
                    )
                })
            } else {
                console.log('Email not in DB')
                res.json('Email not in DB')
            }
        })
    })

    router.get('/password/reset', (req, res, next) => {
        User.findOne({
            resetPasswordToken: req.query.token,
            resetPasswordTokenExpires: {
                $gt: Date.now(),
            },
        }).exec((error, user) => {
            if (error) {
                console.error('Error while looking up user in DB: ' + error)
                res.status(500).json('Failed to reset password due to DB error')
                return
            }

            if (user) {
                res.status(200).send({
                    email: user.email,
                    message: 'Password reset link is valid',
                })
            } else {
                console.log('Password reset link is invalid or has expired')
                res.json('Password reset link is invalid or has expired')
            }
        })
    })

    router.post('/password/update-after-reset', (req, res, next) => {
        User.findOne({
            email: req.body.email,
        }).exec((error, user) => {
            if (user) {
                console.log('User exists in DB')
                bcrypt
                    .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                    .then(hashedPassword => {
                        user.set({
                            password: hashedPassword,
                            resetPasswordToken: null,
                            resetPasswordTokenExpires: null,
                        })
                        user.save(function(saveError, updatedUser) {
                            if (saveError) {
                                console.error(saveError)
                                res.status(500).send(
                                    'Error while saving new password'
                                )
                            }

                            console.log('Password updated')
                            res.status(200).send({
                                message: 'Password updated',
                            })
                        })
                    })
            } else {
                console.log('No user exists in DB to update')
                res.status(404).json('No user exists in DB to update')
            }
        })
    })
}
