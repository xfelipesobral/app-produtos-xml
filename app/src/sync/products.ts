import { getAllProducts } from '../api/products'

import { cacheProducts } from '../cache'

export async function syncProducts() {
    try {
        const products = await getAllProducts()
        await cacheProducts.write(products)
    } catch (e) {
        console.log(`Error on sync products: ${e}`)
    }
}