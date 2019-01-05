import { Router } from 'express'
import loginRoutes from './login'
import passwordRoutes from './password'
import registerRoutes from './register'
import userRoutes from './users'

const router = Router()

userRoutes(router)
loginRoutes(router)
registerRoutes(router)
passwordRoutes(router)

export default app => app.use('/api', router)
