import Imap from 'imap'

function imapInit() {
    const imap = new Imap({
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: process.env.EMAIL_HOST || 'imap.gmail.com',
        port: Number(process.env.EMAIL_PORT || '993'),
        tls: typeof process.env.EMAIL_TLS !== 'undefined' ? process.env.EMAIL_TLS === '1' : true,
        tlsOptions: {
            servername: process.env.EMAIL_HOST || 'imap.gmail.com'
        }
    })

    return imap
}

export default imapInit