var Morse = {};

Morse.encode = function (message) {
    // ·–·–·– ·–·–·– ·–·–·–
    let bits32 = ''
    let array = []
    for (let i = 0; i < message.length; i++) {
        const binaire = this.alpha[message[i]]
        if (binaire == '0')
            continue
        bits32 += binaire
        if (message[i + 1] != null && message[i + 1] != ' ') {
            bits32 += '0'.repeat(3)
        }
        else {
            bits32 += '0'.repeat(7)
        }

        if (bits32.length >= 32) {
            const complement = (~parseInt(bits32.substring(0, 32), 2)) + 1
            array = this.addComplement(complement, array)
            bits32 = bits32.substring(32)
        }
    }
    bits32 = bits32 + '0'.repeat(32 - bits32.length % 32)
    if (bits32.length >= 32) {
        const complement = (~parseInt(bits32.substring(0, 32), 2)) + 1
        array = this.addComplement(complement, array)
    }
    return array
};

Morse.decode = function (integerarrayay) {
    // ·–·–·– ·–·–·– ·–·–·–
    // utiliser des regex maybe ?
    console.log(  (integerarrayay[0]>>> 0).toString(2))
  
};
Morse.addComplement = function (complement, array) {
    if (complement < 0)
        complement = Math.abs(complement)
    else
        complement = complement - (complement * 2)
    return array.concat(complement)
}
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
console.log(Morse.encode('HELLO WORLD'))
console.log(Morse.decode([ -1440552402, -1547992901, -1896993141, -1461059584 ]))

/*
E => 1
I => 101
EEEEEEEIE => 1111111 0 101 0 1
*/