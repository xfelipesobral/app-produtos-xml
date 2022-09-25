interface IAttachment {
    id: string
    uri?: string
    date?: Date
    read?: number
}

interface IAttachmentInterface {
    create(attachment: IAttachment): Promise<string>
    update(attachment: IAttachment): Promise<string>
    findById(id: string): Promise<IAttachment>
    findByUri(uri: string): Promise<IAttachment>
    findMany(read: number): Promise<Array<IAttachment>>
    deleteById(id: string): Promise<IAttachment>
}

export { IAttachment, IAttachmentInterface }