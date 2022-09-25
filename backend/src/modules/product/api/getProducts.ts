import { Request, Response } from 'express'

import Product from '../infra/service'

async function getProducts(request: Request, response: Response) {
    const products = await Product.findAll()

    products.forEach(product => {
        product.value = product.value / 100
        product.valueSale = product.valueSale / 100
    })

    return response.status(201).send({
        products
    })
}

export default getProducts