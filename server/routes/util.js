import passport from 'passport'

export function authenticateRoute(method, req, res, next, callback) {
    passport.authenticate(method, { session: false }, (err, obj, info) => {
        if (err) {
            console.log(err)
        }

        if (info !== undefined) {
            console.log(info.message)
            res.send(info.message)
        } else {
            callback(obj)
        }
    })(req, res, next)
}

export function callbackWithoutContent(res, successMessage = undefined) {
    return (err, user) => {
        if (err) {
            console.log('Problem communicating with DB')
            res.status(500).send(err)
        } else {
            if (successMessage) {
                console.log(successMessage)
                res.status(200).send(successMessage)
            } else {
                res.status(200).end()
            }
        }
    }
}
