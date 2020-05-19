var hashMap = []
var fibonacci = function (n) {
    if (n == 0 || n == 1)
        return n;

    if (hashMap[n - 1] == undefined)
        hashMap[n - 1] = fibonacci(n - 1)
    if (hashMap[n - 2] == undefined)
        hashMap[n - 2] = fibonacci(n - 2)

    return hashMap[n - 1] + hashMap[n - 2]
}