module.exports = function solution(list) {
    let formattedString = list[0] + ''
    let backtrack = formattedString
    let rangeLength = 1
    for (let i = 1; i < list.length; i++) {
        if (list[i] == list[i - 1] + 1) {
            formattedString += ',' + list[i]
            rangeLength++
        }
        else if (rangeLength < 3) {
            formattedString += ',' + list[i]
            rangeLength = 1
            backtrack = formattedString
        } else {
            formattedString = backtrack
            formattedString += '-' + list[i - 1] + ',' + list[i]
            backtrack = formattedString
            rangeLength = 1
        }
    }
    if (rangeLength > 2) {
        formattedString = backtrack
        formattedString += '-' + list[list.length - 1]
    }
    return formattedString
}