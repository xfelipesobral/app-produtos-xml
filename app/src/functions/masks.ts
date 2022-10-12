export function maskFloat(n: number): string {
    if (n === 0) return '0,00'

    const str = String(n.toFixed(2)).replace('.', ',')
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}