import rateLimit from 'express-rate-limit'

export function limitLoginAttempts(app) {
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 10,
    })

    app.use('/api/login', limiter)
}
