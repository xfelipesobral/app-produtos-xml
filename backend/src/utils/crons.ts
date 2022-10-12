import cron from 'node-cron'
import captureNewNFeEmails from '../modules/attachment/useCases/captureNewNFeEmails'

function cronNewNFeEmails() {
    cron.schedule('*/30 8,9,10,11,12 * * *', () => {
        try {
            captureNewNFeEmails()
        } catch {
            // 
        }
    }, {
        timezone: 'America/Sao_Paulo'
    })
}

export {
    cronNewNFeEmails
}