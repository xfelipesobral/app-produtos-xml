import axios from 'axios'

import { IProduct } from '../@types/models'

import {
    authorization,
    server
} from '../json/config.json'

export function getAllProducts(): Promise<IProduct[]> {
    interface IRequest {
        products: IProduct[]
    }

    return new Promise((resolve, reject) => {
        axios.get(`${server}/products`, {
            headers: {
                authorization
            }
        })
        .then(({ data }) => {
            if (!data) resolve([])

            const { products } = data as IRequest

            resolve(products)
        })
        .catch(() => {
            reject('Unable to retrieve products')
        })
    })
}