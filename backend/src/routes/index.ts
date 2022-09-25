import { Router, Request, Response } from 'express'

import auth from '../middlewares/auth'

import attachmentsRouter from './attachment.routes'
import productsRouter from './product.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'online'
    })
})

router.use('/attachments', auth, attachmentsRouter)
router.use('/products', auth, productsRouter)

export default router