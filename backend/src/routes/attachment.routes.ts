import { Router } from 'express'

import captureNewNFeEmails from 'modules/attachment/api/captureNewNFeEmails'

const attachmentsRouter = Router()

attachmentsRouter.get('/check', captureNewNFeEmails)

export default attachmentsRouter