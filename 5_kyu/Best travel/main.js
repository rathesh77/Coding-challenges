function chooseBestSum(t, k, ls) {
    if (ls.length < k)
        return null
    const maxVal = Math.max(...ls)
    if (k == 1 && maxVal <= t) {
        return maxVal
    }
    let sum = 0
    let maxSum = null
    for (let i = 0; i < ls.length; i++) {
        if (ls[i] == t && k == 1)
            return t
        sum += ls[i]
        const temp = maxSum
        maxSum = combination(sum, t, k - 1, ls.slice(i + 1, ls.length), null)
        if (!maxSum || maxSum < temp || maxSum > t)
            maxSum = temp
        sum = 0
    }
    return maxSum
}
function combination(sum, t, k, ls, currentBestValue) {
    if (k == 1) {
        let bestValueToPick = currentBestValue
        for (let i = 0; i < ls.length; i++) {
            let result = sum + ls[i]
            if (result <= t && result > bestValueToPick) {
                bestValueToPick = result
            }
        }
        return bestValueToPick
    }
    let currentBestValueCopy = currentBestValue
    for (let i = 0; i < ls.length; i++) {
        sum += ls[i]
        let resultat = combination(sum, t, k - 1, ls.slice(i + 1, ls.length), currentBestValueCopy)
        sum -= ls[i]
        currentBestValueCopy = resultat
    }
    return currentBestValueCopy
}

let ts = [50, 55, 56, 57, 58]
console.log(chooseBestSum(163, 3, ts), 163)
ts = [50]
console.log(chooseBestSum(163, 3, ts), null)
ts = [91, 74, 73, 85, 73, 81, 87]
console.log(chooseBestSum(230, 3, ts), 228)
console.log(chooseBestSum(331, 2, ts), 178)
console.log(chooseBestSum(331, 4, ts), 331)
console.log(chooseBestSum(331, 5, ts), null)
console.log(chooseBestSum(331, 1, ts), 91)
console.log(chooseBestSum(700, 6, ts), 491)
var xs = [100, 76, 56, 44, 89, 73, 68, 56, 64, 123, 2333, 144, 50, 132, 123, 34, 89]
console.log(chooseBestSum(230, 4, xs), 230)
console.log(chooseBestSum(430, 5, xs), 430)
console.log(chooseBestSum(430, 8, xs), null)
console.log(chooseBestSum(880, 8, xs), 876)
console.log(chooseBestSum(2430, 15, xs), 1287)
console.log(chooseBestSum(100, 2, xs), 100)
console.log(chooseBestSum(276, 3, xs), 276)
console.log(chooseBestSum(3760, 17, xs), 3654)
console.log(chooseBestSum(3760, 40, xs), null)
console.log(chooseBestSum(50, 1, xs), 50)
console.log(chooseBestSum(1000, 18, xs), null)
xs = [100, 64, 123, 2333, 144, 50, 132, 123, 34, 89]
console.log(chooseBestSum(230, 4, xs), null)
console.log(chooseBestSum(230, 2, xs), 223)
console.log(chooseBestSum(2333, 1, xs), 2333)
console.log(chooseBestSum(2333, 8, xs), 825)
xs = [1000, 640, 1230, 2333, 1440, 500, 1320, 1230, 340, 890, 732, 1346]
console.log(chooseBestSum(2300, 4, xs), 2212)
console.log(chooseBestSum(2300, 5, xs), null)
console.log(chooseBestSum(2332, 3, xs), 2326)
console.log(chooseBestSum(23331, 8, xs), 10789)
console.log(chooseBestSum(331, 2, xs), null)



