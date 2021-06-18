// solution numero 1:
function nextHappyYear(year) {
    //your code here
    do {
        year++
    }
    while (isNotDistinct(year))
    return year
}

function isNotDistinct(num) {
    let filteredDigits = num + ''.split('')
    return new Set(filteredDigits).size != filteredDigits.length
}
// solution numero 2:
function nextHappyYear2(year) {
    year++
    let filteredDigits = year + ''.split('')
    if (new Set(filteredDigits).size != filteredDigits.length)
        return nextHappyYear2(year)
    return year
}
