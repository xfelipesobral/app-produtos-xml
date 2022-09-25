import Attachment from '../infra/service'

function unreadAttachments() {
    return Attachment.findMany(0)
}

export default unreadAttachments