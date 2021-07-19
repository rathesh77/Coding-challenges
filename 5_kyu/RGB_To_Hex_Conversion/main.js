const rgb = (r, g, b) =>
    toBinaryToHex(r < 0 ? 0 : r > 255 ? 255 : r) +
    toBinaryToHex(g < 0 ? 0 : g > 255 ? 255 : g) +
    toBinaryToHex(b < 0 ? 0 : b > 255 ? 255 : b)

const toBinaryToHex = (n) => {
    if (n === 0)
        return '00'
    if (n === 255)
        return 'FF'
    const base16 = {
        '15': 'F',
        '14': 'E',
        '13': 'D',
        '12': 'C',
        '11': 'B',
        '10': 'A'
    }
    let hex = ''
    while (n > 0) {
        const remainder = n % 16
        hex = (!base16[remainder] ? remainder : base16[remainder]) + hex
        n = parseInt(n / 16)
    }
    if (hex.length === 1)
        return '0' + hex
    return hex
}
console.log(rgb(294, 11, 246))
