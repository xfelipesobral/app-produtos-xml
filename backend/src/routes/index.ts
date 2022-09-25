import { Router, Request, Response } from 'express'

import auth from '../middlewares/auth'

import attachmentsRouter from './attachment.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'online'
    })
})

router.use('/attach', auth, attachmentsRouter)

export default router