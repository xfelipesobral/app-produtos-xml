import unreadAttachments from '../../attachment/useCases/unreadAttachments'
import readAttachment from '../../attachment/useCases/readAttachment'

import importProductsFromNFe from './importProductsFromNFe'

async function productsOnAttachments(): Promise<number> {
    const unread = await unreadAttachments()
    let productsUpdated = 0

    if (unread.length === 0) return 0

    for (let i = 0; i < unread.length; i++) {
        const { id, uri, date } = unread[i]
        
        try {
            const products = await importProductsFromNFe(uri, date)
            productsUpdated += products.length
        } catch {
            // 
        }

        readAttachment(id, true).catch(console.log)
    }

    return productsUpdated
}

export default productsOnAttachments