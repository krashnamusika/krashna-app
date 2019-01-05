import jwt from 'jsonwebtoken'
import User from '../models/User'
import { authenticateRoute } from './util'

export default function loginRoutes(router) {
    router.post('/login', (req, res, next) => {
        authenticateRoute('login', req, res, next, user => {
            req.logIn(user, err => {
                if (err) {
                    console.error(err)
                } else {
                    User.findOne({
                        email: user.email.toLowerCase(),
                    }).exec((err, user) => {
                        if (err) {
                            console.log(
                                'Problem communicating with DB while logging in'
                            )
                            res.status(500).send(err)
                        } else {
                            const token = jwt.sign(
                                { id: user.email },
                                process.env.JWT_SECRET
                            )
                            res.status(200).send({
                                auth: true,
                                token: token,
                                message: 'User found & logged in',
                            })
                        }
                    })
                }
            })
        })
    })
}
