import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { IAttachment, IAttachmentInterface } from './interface'

import Error from '@shared/Error'

class AttachmentModel implements IAttachmentInterface {
    private prisma = new PrismaClient().attachment

    async create({ id, uri, date }: IAttachment): Promise<string> {
        const attachmentAlreadyExists = await this.findById(id)

        if (attachmentAlreadyExists) {
            throw new Error('Attachment already exists')
        }

        const attachUriAlreadyExists = await this.findByUri(uri)

        if (attachUriAlreadyExists) {
            throw new Error('Attachment URI already exists')
        }

        if (!id) id = uuid()

        await this.prisma.create({
            data: {
                id,
                uri,
                date,
                read: 0
            }
        })

        return id
    }

    async update({ id, uri, date, read }: IAttachment): Promise<string> {
        const attachAlreadyExists = await this.findById(id)

        if (attachAlreadyExists) {
            throw new Error('Attachment not exists')
        }

        await this.prisma.update({
            where: { id },
            data: {
                uri,
                date,
                read
            }
        })

        return id
    }

    findById(id: string): Promise<IAttachment> {
        return this.prisma.findUnique({
            where: { id }
        })
    }

    findByUri(uri: string): Promise<IAttachment> {
        return this.prisma.findFirst({
            where: { uri }
        })
    }

    findMany(read?: number): Promise<IAttachment[]> {
        return this.prisma.findMany({
            where: {
                read
            }
        })
    }
    
}

export default AttachmentModel