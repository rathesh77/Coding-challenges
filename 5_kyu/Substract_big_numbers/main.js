function subtract(x, y) {

    let negative = false

    let i = 0
    while (x[i] == '0') {
        x = x.substring(i + 1)
    }
    i = 0
    while (y[i] == '0') {
        y = y.substring(i + 1)
    }
    if (+x <= +y) {
        const temp = x
        negative = true
        x = y
        y = temp
    }

    let a = ((x >= 0 ? x : -x) + '').split('').reverse()
    let b = ((y >= 0 ? y : -y) + '').split('').reverse()

    i = 0
    let carry = 0
    let result = ''
    while (b[i] != null) {

        if (+b[i] + carry > +a[i]) {
            result = ((10 + +a[i]) - (+b[i] + carry)) + result
            carry = 1
        }
        else {
            result = (+a[i] - (+b[i] + carry)) + result
            carry = 0
        }
        i++
    }
    while (a[i] != null) {
        if (+a[i] < carry) {
            result = ((10 + +a[i]) - carry) + result
            carry = 1
        }
        else {
            result = (+a[i] - carry) + result
            carry = 0
        }
        i++
    }

    i = 0
    while (result[i] == '0') {
        result = result.substring(i + 1)
    }
    if (result[0] == 0)
        result = result.substring(1)
    if (result == '')
        return '0'
    if (negative)
        result = '-' + result

    return result
}