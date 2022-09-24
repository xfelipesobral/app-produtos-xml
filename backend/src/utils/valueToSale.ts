function profitPercent(value: number) {
    if (value > 500) return 0.5
    if (value > 150) return 0.7
    if (value > 100) return 0.75
    if (value <= 100) return 1.5
}

function valueToSale(value: number) {
    return Math.round((value * profitPercent(value)) + value)
}

export default valueToSale
