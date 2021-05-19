let sum = 0
let value =0

function chooseBestSum(t, k, ls) {
    if (ls.length < k)
        return null
    let maxVal = Math.max(...ls)
    if (k == 1 && maxVal <= t) {
        return maxVal
    }
    for (let i = 0; i < ls.length; i++) {
        if (ls[i] == t && k == 1)
            return t
        sum += ls[i]
        combination(t, k - 1, ls.slice(i + 1, ls.length))
        sum = 0
    }
    let temp = value
    value = 0
    return temp? temp: null
}
function combination(t, k, ls) {
    if (k == 1) {
        for (let i = 0; i < ls.length; i++) {
            let result = sum + ls[i] 
            if (  result <= t && result > value )
            {
                    value = result
            }
        }
        return 0
    }
    for (let i = 0; i < ls.length; i++) {
        sum += ls[i]
        if (!combination(t, k - 1, ls.slice(i + 1, ls.length))) {
            sum -= ls[i]
        }
    }
}
