let Morse = {};

Morse.invertBits = function (num) {
    let bits = (num >>> 0).toString(2)
    if (bits.length < 32)
        bits = '0'.repeat(32 - bits.length) + bits

    let invertedBits = ''
    for (let i = 0; i < bits.length; i++)
        if (bits[i] === '0')
            invertedBits += '1'
        else
            invertedBits += '0'

    if (invertedBits.length < 32)
        invertedBits = '0'.repeat(32 - invertedBits.length) + invertedBits

    return invertedBits
}

Morse.encode = function (message) {
    let bits32 = ''
    let signedIntegers = []
    for (let i = 0; i < message.length; i++) {
        const binary = this.alpha[message[i]]
        let twoComplement = null
        if (binary == '0')
            continue
        bits32 += binary
        if (message[i + 1] != null && message[i + 1] != ' ')
            bits32 += '0'.repeat(3)
        else
            bits32 += '0'.repeat(7)

        if (bits32.length >= 32) {
            twoComplement = (~parseInt(bits32.substring(0, 32), 2)) + 1
            signedIntegers = signedIntegers.concat(-twoComplement)
            bits32 = bits32.substring(32)
        }
    }
    bits32 = bits32 + '0'.repeat(32 - bits32.length % 32)
    if (bits32.length >= 32) {
        twoComplement = (~parseInt(bits32.substring(0, 32), 2)) + 1
        signedIntegers = signedIntegers.concat(-twoComplement)
    }
    return signedIntegers
};

Morse.decode = function (integerArray) {
    let chars = ''
    let totalBinary = ''
    for (let i = 0; i < integerArray.length; i++) {
        let bits32 = this.invertBits((-integerArray[i]) - 1)
        let bits32DecimalToBinary = bits32
        totalBinary += bits32DecimalToBinary
    }
    let words = totalBinary.split('0000000')
    for (let i = 0; i < words.length; i++) {
        if (words[i] == '')
            continue
        words[i].split('000').forEach((c) => {
            const currentChar = this.beta[c]
            if (currentChar != null) {
                chars = chars + (currentChar)
            }
        })

        chars = chars + ' '
    }

    return chars.trim()
};

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

Morse.beta = {
    '10111': 'A',
    '111010101': 'B',
    '11101011101': 'C',
    '1110101': 'D',
    '1': 'E',
    '101011101': 'F',
    '111011101': 'G',
    '1010101': 'H',
    '101': 'I',
    '1011101110111': 'J',
    '111010111': 'K',
    '101110101': 'L',
    '1110111': 'M',
    '11101': 'N',
    '11101110111': 'O',
    '10111011101': 'P',
    '1110111010111': 'Q',
    '1011101': 'R',
    '10101': 'S',
    '111': 'T',
    '1010111': 'U',
    '101010111': 'V',
    '101110111': 'W',
    '11101010111': 'X',
    '1110101110111': 'Y',
    '11101110101': 'Z',
    '1110111011101110111': '0',
    '10111011101110111': '1',
    '101011101110111': '2',
    '1010101110111': '3',
    '10101010111': '4',
    '101010101': '5',
    '11101010101': '6',
    '1110111010101': '7',
    '111011101110101': '8',
    '11101110111011101': '9',
    '10111010111010111': '.',
    '1110111010101110111': ',',
    '101011101110101': '?',
    '1011101110111011101': '\'',
    '1110101110101110111': '!',
    '1110101011101': '/',
    '111010111011101': '(',
    '1110101110111010111': ')',
    '10111010101': '&',
    '11101110111010101': ':',
    '11101011101011101': ';',
    '1110101010111': '=',
    '1011101011101': '+',
    '111010101010111': '-',
    '10101110111010111': '_',
    '101110101011101': '"',
    '10101011101010111': '$',
    '10111011101011101': '@',
};

console.log(Morse.encode('HELLO WORLD'))
console.log(Morse.decode([-1440552402, -1547992901, -1896993141, -1461059584]))