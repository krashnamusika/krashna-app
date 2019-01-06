import { Router } from 'express'
import projectRoutes from './projects'

const router = Router()

projectRoutes(router)

export default router => router.use('/schedule', router)
