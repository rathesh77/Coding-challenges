let Morse = {};

Morse.invertBits = function (num) {
    let bits = (num >>> 0).toString(2)
    if (bits.length < 32)
        bits = '0'.repeat(32 - bits.length) + bits
    return bits.split('').map(a => a == '1' ? '0' : '1').join('')
}

Morse.encode = function (message) {
    const signedIntegers = message
        .split('')
        .reduce((acc, val, i, array) => {
            const binary = Morse.alpha[val >= 'a' && val <= 'z' ? val.toUpperCase() : val]
            return binary == '0' ? acc + '0'.repeat(7) : acc + binary + (array[i + 1] != ' ' ? '000' : '')
        }, '')
    return (signedIntegers + '0'.repeat(32 - signedIntegers.length % 32))
        .match(/[0-1]{32}/g)
        .reduce((acc, val) => acc.concat([-((~parseInt(val.substring(0, 32), 2)) + 1)]), []);
};

Morse.decode = integerArray =>
    integerArray
        .reduce((acc, val) => acc + Morse.invertBits(-val - 1), '')
        .split('0000000')
        .reduce((acc, val) =>
            acc + val
                .split('000')
                .reduce((acc, val) => Morse.beta[val] != null ? acc + Morse.beta[val] : acc, '') + ' '
            , '').trim()

Morse.alpha = {
    'A': '10111',
    'B': '111010101',
    'C': '11101011101',
    'D': '1110101',
    'E': '1',
    'F': '101011101',
    'G': '111011101',
    'H': '1010101',
    'I': '101',
    'J': '1011101110111',
    'K': '111010111',
    'L': '101110101',
    'M': '1110111',
    'N': '11101',
    'O': '11101110111',
    'P': '10111011101',
    'Q': '1110111010111',
    'R': '1011101',
    'S': '10101',
    'T': '111',
    'U': '1010111',
    'V': '101010111',
    'W': '101110111',
    'X': '11101010111',
    'Y': '1110101110111',
    'Z': '11101110101',
    '0': '1110111011101110111',
    '1': '10111011101110111',
    '2': '101011101110111',
    '3': '1010101110111',
    '4': '10101010111',
    '5': '101010101',
    '6': '11101010101',
    '7': '1110111010101',
    '8': '111011101110101',
    '9': '11101110111011101',
    '.': '10111010111010111',
    ',': '1110111010101110111',
    '?': '101011101110101',
    "'": '1011101110111011101',
    '!': '1110101110101110111',
    '/': '1110101011101',
    '(': '111010111011101',
    ')': '1110101110111010111',
    '&': '10111010101',
    ':': '11101110111010101',
    ';': '11101011101011101',
    '=': '1110101010111',
    '+': '1011101011101',
    '-': '111010101010111',
    '_': '10101110111010111',
    '"': '101110101011101',
    '$': '10101011101010111',
    '@': '10111011101011101',
    ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
};

Morse.beta = {};
for (const entry of Object.entries(Morse.alpha))
    Morse.beta[entry[1]] = entry[0]

console.log(Morse.decode(Morse.encode('ERPZ80ZIVH $@SIWOTWMVB !"SW7KU6A6SF')))

module.exports = {Morse}