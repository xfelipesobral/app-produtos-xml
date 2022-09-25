import fs from 'fs'
import Attachment from '../infra/service'

import Error from '@shared/Error'

function deleteUri(uri: string) {
    try {
        if (fs.existsSync(uri)) {
            fs.rmSync(uri)
        } else {
            throw new Error('Attachment not found or not exists')
        }
    } catch {   
        throw new Error(`Could not be delete attachment`)
    }
}

async function readAttachment(id: string, deleteFile: boolean = false) {
    try {
        if (deleteFile) {
            const { uri } = await Attachment.findById(id)

            await Attachment.deleteById(id)
            if (uri) deleteUri(uri)
        } else {
            await Attachment.update({ id, read: 1 })
        }
    } catch (e) {
        throw new Error(`Could not be read file "${id}"`)
    }
}

export default readAttachment