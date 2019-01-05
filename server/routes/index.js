import { Router } from 'express'
import loginRoutes from './login'
import registerRoutes from './register'
import userRoutes from './users'

const router = Router()

userRoutes(router)
loginRoutes(router)
registerRoutes(router)

export default app => app.use('/api', router)
