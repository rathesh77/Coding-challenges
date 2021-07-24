function sum() {
    if (arguments[0] == null)
        return '0'

    let sum = arguments[0]
    let i = 1
    for (; i < arguments.length; i++)
        sum = add(sum, ''+arguments[i])
    i = 0
    while (sum[i] == '0')
        sum = sum.substring(i + 1)
    return '' + sum
}

function add(x, y) {

    let a = ((x >= 0 ? x : -x) + '').split('').reverse()
    let b = ((y >= 0 ? y : -y) + '').split('').reverse()

    if (a.length > b.length) {
        let temp = a
        a = b
        b = temp
    }

    let i = 0
    let add = ''
    let carry = 0
    while (a[i] != null) {
        const u = +a[i]
        const v = +b[i]
        const sum = u + v + carry
        add = (sum % 10) + add
        carry = parseInt(sum / 10)
        i++
    }
    while (b[i] != null) {
        const u = +b[i]
        const sum = u + carry
        add = (sum % 10) + add
        carry = parseInt(sum / 10)
        i++
    }
    if (carry)
        add = carry + add 
    return add
}

console.log(sum('154531564897456456465155648978943121612315648964894889891566155645644564894894848489489489','498984894898448994898445231213186787899155612318974535624565461231234889789'))