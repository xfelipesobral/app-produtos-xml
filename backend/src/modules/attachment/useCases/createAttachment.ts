import fs from 'fs'
import { v4 as uuid } from 'uuid'

import Attachment from '../infra/service'

import Error from '@shared/Error'

interface ICreateAttachment {
    name?: string
    uri?: string
    buffer?: Buffer
    date?: Date
    bufferFormat?: string
}

function createAttachment({ name, uri, buffer, bufferFormat, date }: ICreateAttachment) {
    if (!date) date = new Date()

    if (!uri && !buffer) {
        throw new Error('Attachment buffer or uri is obrigatory')
    }

    if (buffer) {
        if (!name) name = uuid()
        uri = `uploads/${name}.${bufferFormat || 'xml'}`
        
        fs.createWriteStream(uri).write(buffer)
    }

    return Attachment.create({ id: '', uri, date })
}

export default createAttachment