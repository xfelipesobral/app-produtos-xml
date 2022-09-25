import { Router } from 'express'

import getProducts from '../modules/product/api/getProducts'

const productsRouter = Router()

productsRouter.get('/', getProducts)

export default productsRouter