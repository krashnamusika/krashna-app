import User from '../models/User'
import { authenticateRoute, callbackWithoutContent } from './util'

export default function userRoutes(router) {
    router.get('/users', (req, res, next) => {
        authenticateRoute('jwt', req, res, next, user => {
            User.findOne({ email: user.email }).exec(
                callbackWithoutContent(res)
            )
        })
    })

    router.delete('/users', (req, res, next) => {
        authenticateRoute('jwt', req, res, next, user => {
            User.deleteMany({ email: user.email }).exec(
                callbackWithoutContent(res)
            )
        })
    })
}
