import moment from 'moment'

export function ddmmyyyy(date: Date) {
    return moment(date).format('DD/MM/YYYY')
}

export function diffDays(init: Date, end: Date) {
    const a = moment(init)
    const b = moment(end)

    return a.diff(b, 'days')
}