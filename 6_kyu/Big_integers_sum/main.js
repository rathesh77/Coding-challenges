function sum() {
    if (arguments[0] == null)
        return '0'

    let sum = arguments[0]
    let i = 1
    for (; i < arguments.length; i++)
        sum = add(sum, arguments[i])
    i = 0
    while (sum[i] == '0')
        sum = sum.substring(i + 1)
    return '' + sum
}

function add(x, y) {

    let a = ((x >= 0 ? x : -x) + '')
    let b = ((y >= 0 ? y : -y) + '')

    if (a.length > b.length) {
        let temp = a
        a = b
        b = temp
    }

    let i = a.length - 1
    let j = b.length - 1
    let add = ''
    let carry = 0
    while (a[i] != null) {
        const u = +a[i]
        const v = +b[j]
        const sum = u + v + carry
        add = (sum % 10) + add
        carry = parseInt(sum / 10)
        i--
        j--
    }
    while (b[j] != null) {
        const u = +b[j]
        const sum = u + carry
        add = (sum % 10) + add
        carry = parseInt(sum / 10)
        j--
    }
    if (carry)
        add = carry + add
    return add
}