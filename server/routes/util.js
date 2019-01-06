import passport from 'passport'

export function authenticateRoute(method, req, res, next, callback) {
    passport.authenticate(method, { session: false }, (err, user, info) => {
        if (err) {
            console.log(err)
            return next(err)
        }

        if (info !== undefined) {
            console.log(info.message)
            return res.send(info.message)
        } else {
            return callback(user)
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

export function assertHasObjectParameters(obj, res, params) {
    params.forEach(parameterName => {
        if (!obj.hasOwnProperty(parameterName)) {
            res.status(422).send(`Missing parameter ${parameterName}`)
        }
    })
}

export function assertHasBodyParameters(req, res, params) {
    assertHasObjectParameters(req.body, res, params)
}

export function updateModelWithBodyParameters(req, model, params) {
    params.forEach(param => {
        if (req.body.hasOwnProperty(param)) {
            model[param] = req.body.param
        }
    })
}

export function authenticateAndProtectRoute(
    method,
    req,
    res,
    next,
    neededLevel,
    callback
) {
    authenticateRoute(method, req, res, next, user => {
        if (
            user.permissionLevels &&
            user.permissionLevels.indexOf(neededLevel) > -1
        ) {
            callback(user)
        } else {
            res.status(401).end()
        }
    })
}
