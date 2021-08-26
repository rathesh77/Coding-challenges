function subtract(x, y) {

    let negative = false
    let i = 0
    while (x[i] == '0')
        x = x.substring(i + 1)

    i = 0
    while (y[i] == '0')
        y = y.substring(i + 1)

    if (+x <= +y) {
        const temp = x
        negative = true
        x = y
        y = temp
    }

    let a = ((x >= 0 ? x : -x) + '')
    let b = ((y >= 0 ? y : -y) + '')


    i = b.length - 1
    let j = a.length - 1
    let carry = 0
    let result = ''
    while (b[i] != null) {
        if (+b[i] + carry > +a[j]) {
            result = ((10 + +a[j]) - (+b[i] + carry)) + result
            carry = 1
        }
        else {
            result = (+a[j] - (+b[i] + carry)) + result
            carry = 0
        }
        i--
        j--
    }
    while (a[j] != null) {
        if (a[j] < carry) {
            result = ((10 + a[j]) - carry) + result
            carry = 1
        }
        else {
            result = (a[j] - carry) + result
            carry = 0
        }
        j--

    }
    while (result[0] == '0')
        result = result.substring(1)
    if (result == '')
        return '0'
    if (negative)
        result = '-' + result
    return result
}