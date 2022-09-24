import { readFileSync } from 'fs'
import { parseStringPromise as readXmlFromString } from 'xml2js'

import { IProduct } from '../infra/interface'
import Product from '../infra/service'

import Error from '@shared/Error'
import valueToSale from '@utils/valueToSale'

async function importProductsFromNFe(uri: string): Promise<Array<IProduct>> {
    let xml = ''
    const products: Array<IProduct> = []

    try {
        xml = readFileSync(uri, 'utf8')
    } catch (e) {
        throw new Error('Could not read XML file')
    }

    try {
        const {
            nfeProc: { NFe: { infNFe: { det } } }
        } = await readXmlFromString(xml, {
            mergeAttrs: true,
            ignoreAttrs: true,
            explicitArray: false
        })
        
        if (!Array.isArray(det)) {
            throw new Error('This XML is not supported')
        }

        det.forEach(({ prod: { cProd, xProd, vUnCom } }) => {
            const prodValue = Math.round(vUnCom * 100) || 0

            products.push({
                id: cProd || '',
                description: xProd || '',
                value: prodValue,
                valueSale: valueToSale(prodValue)
            })
        })  
    } catch (e) {
        throw new Error('Could not convert xml')
    }

    products.forEach(({ id, description, value, valueSale }) => {
        Product.sync({ id, value, valueSale, description }).then(() => {
            console.log(`Product ${id} - ${description} - ${valueSale} (${value}) imported`)
        }).catch((e) => {
            console.log(`Product cannot be updated`)
        })
    })

    return products
}

export default importProductsFromNFe