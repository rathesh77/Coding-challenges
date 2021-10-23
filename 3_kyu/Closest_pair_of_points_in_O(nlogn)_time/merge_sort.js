function mergeSort(a) {
    const midIndex = parseInt((a.length) / 2)

    const left = a.slice(0, midIndex)
    const right = a.slice(midIndex, a.length)

    return mergeAndSort(left, right)
}

function mergeAndSort(left, right) {

    //console.log(left, right)

    const fuzed = left.concat(right)
    if (fuzed.length == 1) {
        return fuzed
    }
    if (left.length == right.length && right.length == 1) {
        return sort(left[0], right[0])
    }

    let newArray = []

    const newLeft = split(left)
    newArray = newArray.concat(mergeAndSort(newLeft[0], newLeft[1]))

    const newRight = split(right)
    //newArray = bruteForce(newArray, (mergeAndSort(newRight[0], newRight[1])))

    return bruteForce(newArray, (mergeAndSort(newRight[0], newRight[1])))
}

function bruteForce(left, right) {
    if (left.length < right.length) {
        const temp = left
        left = right
        right = temp
    }

    let i = 0
    let j = 0
    while (j < right.length) {
        if (right[j] >= left[left.length - 1]) {
            left.push(right[j])
            j++
        } else if (right[j] <= left[0]) {
            left.unshift(right[j])
            j++
        } else {
            while (right[j] < left[i] || right[j] > left[i + 1]) {
                i++
            }
            left.splice(i + 1, 0, right[j])
            j++
        }
    }
    return left
}

function split(array) {
    const midIndex = parseInt(array.length / 2)

    const left = array.slice(0, midIndex)
    const right = array.slice(midIndex)

    return [left, right]
}
function sort(a, b) {
    return a <= b ? [a, b] : [b, a]
}

//console.log(bruteForce([27, 43], [3, 10, 90]))
function isSorted(a) {
    for (let i = 0; i < a.length; i++) {
        for ( let j = i+1; j< a.length; j++) {
            if (a[i] > a[j])
                return false
        }
    }
    return true
}
for (let i = 0; i < 100; i++) {

    let a = []
    for ( let j = 0; j < 100; j++) {

        let num = Math.floor(Math.random()*1000)
        if (Math.random() < .5)
            num = -num
        a.push(num)

    }
    console.log(isSorted(mergeSort(a)))


}
//console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]))
