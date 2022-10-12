import imapInit from '../../../shared/imapInit'
import { simpleParser } from 'mailparser'

import Error from '../../../shared/Error'

import createAttachment from './createAttachment'
import productsOnAttachments from '../../product/useCases/productsOnAttachments'

interface IAttach {
    buffer: Buffer
    bufferFormat: 'xml'
    date: Date,
    name: string
}

function registerFiles(attachments: Array<IAttach>): Promise<Boolean> {
    return new Promise(resolve => {
        const len = attachments.length
        let i = 0

        if (len === 0) resolve(true)

        const checkStop = () => {
            i += 1
            
            if (i === len) {
                resolve(true)
            }
        }

        attachments.forEach(attachment => createAttachment(attachment).then(checkStop).catch(checkStop))
    })
}

function getAttachFromEmails(query: string): Promise<Array<IAttach>> {
    const imap = imapInit()
    const attachs: Array<IAttach> = []

    return new Promise((resolve, reject) => {
        imap.once('ready', async () => {
            imap.openBox('INBOX', false, () => {
                imap.search(['UNSEEN', ['TEXT', query]], (err, uids) => {
                    if (uids.length === 0) {
                        return resolve(attachs)
                    }

                    const readEmails = imap.fetch(uids, { bodies: '', markSeen: true })

                    readEmails.on('message', msg => {
                        msg.on('body', stream => {
                            
                            simpleParser(stream, (err, { attachments, date }) => {
                                const [nfe] = attachments.filter(({ contentType }) => contentType === 'application/xml')
                                
                                if (nfe) {
                                    attachs.push({
                                        buffer: nfe.content,
                                        bufferFormat: 'xml',
                                        date,
                                        name: nfe.checksum
                                    })
                                }
                            })
                        })
    
                        imap.end()
                    })
                })
            })
        })
    
        imap.once('error', () => {
            reject('Unable to read emails')
        })
    
        imap.once('end', () => {
            resolve(attachs)
        })
    
        imap.connect()
    })
}

async function captureNewNFeEmails() {
    try {
        const attachments = await getAttachFromEmails('L MOCCI COMERCIO DE FRUTAS LTDA')

        await registerFiles(attachments)
        await productsOnAttachments()

        return attachments.length
    } catch (e) {
        throw new Error('Unable to read emails')
    }
}

export default captureNewNFeEmails