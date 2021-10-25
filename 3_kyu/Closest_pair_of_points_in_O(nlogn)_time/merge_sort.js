function mergeSort(a) {
    //console.log(a)
    if (a.length <= 1)
        return a

    if (a.length <= 2) {
        if (a[0] > a[1]) {
            const temp = a[0]
            a[0] = a[1]
            a[1] = temp
        }
        return a
    }
    const left = mergeSort(a.slice(0, a.length / 2))
    const right = mergeSort(a.slice(a.length / 2))

    return bruteForce(left, right)

}

function bruteForce(left, right) {
    //console.log(left.length, right.length)
    if (left.length < right.length) {
        const temp = left
        left = right
        right = temp
    }

    let i = 0
    let j = 0
    while (j < right.length) {
        while (left[i] < right[j] && i + 1 < left.length) {
            i++
        }
        if (i == left.length - 1) {
            while (j < right.length) {
                if (right[j] < left[i]) {
                    left.splice(i, 0, right[j])
                } else {
                    left.push(right[j])
                }
                i++
                j++
            }
            return left
        }
        left.splice(i, 0, right[j])
        i++
        j++
    }

    return left
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




//console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]))

console.log(bruteForce([3, 9, 10, 82], [27, 43]))