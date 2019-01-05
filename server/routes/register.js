import { authenticateRoute } from './util'

export default function registerRoutes(router) {
    router.post('/register', (req, res, next) => {
        authenticateRoute('register', req, res, next, user => {
            res.status(200).send('User registered')
        })
    })
}
