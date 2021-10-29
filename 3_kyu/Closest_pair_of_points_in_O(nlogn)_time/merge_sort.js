function mergeSort(a, begin, end) {
    //console.log(a, begin, end)
    if (end - begin == 0)
        return a

    if (end - begin == 1) {
        if (a[0] > a[1]) {
            const temp = a[0]
            a[0] = a[1]
            a[1] = temp
        }
        return a
    }
    const mid = parseInt((begin + end) / 2)
    mergeSort(a, begin, mid)
    mergeSort(a, mid + 1, end)

    return bruteForce(a, begin, mid, end)

}

function bruteForce(a, begin, mid, end) {
    console.log(a.slice(begin, mid+1), a.slice(mid+1, end+1))
    /*if (left.length < right.length) {
        const temp = left
        left = right
        right = temp
    }

    if (right[0] >= left[left.length-1]) {
        return left.concat(right)
    }
    if (right[right.length - 1] <= left[0]) {
        return right.concat(left)
    }
    */
    let i = begin
    let j = mid + 1
    while (j <= end) {
        while (a[i] < a[j] && i + 1 <= mid) {
            i++
        }
        if (i == mid) {
            break
        }
        a.splice(i, 0, a[j])
        a.splice(j + 1, 1)

        i++
        j++
    }
    while (j <= end) {
        if (a[j] <= a[i]) {
            a.splice(i, 0, a[j])
        } else {
            a.splice(i + 1, 0, a[j])
        }
        a.splice(j + 1, 1)

        i++
        j++
    }
    return a
}

function isSorted(a) {
    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if (a[i] > a[j])
                return false
        }
    }
    return true
}
/*
for (let i = 0; i < 1000; i++) {
    let a = []

    for (let j = 0; j < 1000; j++) {

        let num = Math.floor(Math.random() * 10000)
        if (Math.random() < .2)
             num = -num
        a.push(num)

    }
    console.log((isSorted(mergeSort(a))))

}*/




console.log(mergeSort([38, 27, 43, 3, 9, 82, 10], 0, 6))

//module.exports = mergeSort
//console.log(bruteForce([3, 9, 10, 82], [27, 43]))