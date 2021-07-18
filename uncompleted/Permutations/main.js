module.exports = function permutations(string, duplicates = {}) {
    let _permutations = []

    if (!duplicates[string])
        _permutations = [string]
    duplicates[string] = true

    for (let i = 0; i < string.length; i++)
        for (let pos = 0; pos < string.length; pos++) {
            if (pos === i)
                continue
            const swap = swapCharacters(i, pos, string)
            if (!duplicates[swap]) {
                duplicates[swap] = true
                _permutations.push(swap)
                _permutations = _permutations.concat(permutations(swap, duplicates))
            }
        }

    return _permutations
}

function swapCharacters(i, pos, str) {
    let s = ''
    const temp = str[pos]
    s = str.substring(0, pos) + str[i] + str.substring(pos + 1)
    s = s.substring(0, i) + temp + s.substring(i + 1)
    return s
}