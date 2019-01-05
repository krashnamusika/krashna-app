import bcrypt from 'bcrypt'
import passport from 'passport'
import jwtStrategy from 'passport-jwt'
import localStrategy from 'passport-local'
import User from '../models/User'
import { BCRYPT_SALT_ROUNDS } from './authSettings'

passport.serializeUser(function(user, done) {
    done(null, user.email)
})

passport.deserializeUser(function(email, done) {
    User.findOne({ email }).exec(function(err, user) {
        done(err, user)
    })
})

passport.use(
    'register',
    new localStrategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, email, password, done) => {
            if (require('../valid-emails.json').indexOf(email) === -1) {
                console.log('Email not known with admins')
                return done(null, false, {
                    message: 'Email not known with admins',
                })
            }

            User.findOne({
                email: email,
            }).exec((err, user) => {
                if (err) {
                    return done(err)
                }

                if (user != null) {
                    console.log('Email taken')
                    return done(null, false, {
                        message: 'Email taken',
                    })
                } else {
                    bcrypt
                        .hash(password, BCRYPT_SALT_ROUNDS)
                        .then(hashedPassword => {
                            User.create({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email,
                                password: hashedPassword,
                                permissionLevel: 'MEMBER',
                            }).then(user => {
                                console.log('User registered')
                                return done(null, user, {
                                    message: 'User registered',
                                })
                            })
                        })
                }
            })
        }
    )
)

passport.use(
    'login',
    new localStrategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        (email, password, done) => {
            User.findOne({
                email: email,
            }).exec((err, user) => {
                if (err) {
                    return done(err)
                }

                if (user === null) {
                    return done(null, false, {
                        message: `Email and password don't match`,
                    })
                } else {
                    bcrypt.compare(password, user.password).then(response => {
                        if (response !== true) {
                            console.log(`Email and password don't match`)
                            return done(null, false, {
                                message: `Email and password don't match`,
                            })
                        }
                        console.log('User found & authenticated')
                        return done(null, user)
                    })
                }
            })
        }
    )
)

const jwtOptions = {
    jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(
    'jwt',
    new jwtStrategy.Strategy(jwtOptions, (jwtPayload, done) => {
        User.findOne({
            email: jwtPayload.id,
        }).exec((err, user) => {
            if (err) {
                return done(err)
            }

            if (user) {
                console.log('User found in DB in Passport')
                done(null, user)
            } else {
                console.log('User not found in DB')
                done(null, false)
            }
        })
    })
)
