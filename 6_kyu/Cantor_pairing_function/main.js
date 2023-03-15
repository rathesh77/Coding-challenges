function cantor(n) {
    const X = n - 1
    const w = Math.floor((Math.sqrt((8 * X) + 1) - 1) / 2)
    const t = ((w + 1) * w) / 2
    const y = X - t
    const x = w - y

    return ((x + y + 1) % 2 !== 0 ? [x + 1, y + 1] : [y + 1, x + 1]).join('/')
}