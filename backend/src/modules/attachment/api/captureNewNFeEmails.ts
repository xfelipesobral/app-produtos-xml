import { Request, Response } from 'express'

import fn from '../useCases/captureNewNFeEmails'

async function captureNewNFeEmails(request: Request, response: Response) {
    const numberAttachmentsFound = await fn()

    return response.status(201).send({
        numberAttachmentsFound
    })
}

export default captureNewNFeEmails