module.exports = function closest(strng) {
    if (!strng.length)
        return []
    let ascOrderedWeights = strng
        .split(' ')
        .map((a, i) => ({
            index: i,
            value: a,
            weight: parseInt((a)
                .split('')
                .reduce((acc, val) => parseInt(acc) + parseInt(val)))
        }))
        .sort((a, b) => a.weight - b.weight)

    let min = { weightsDifferences: Infinity, subArrays: [[], []] }

    for (let i = 0, j = 1; i < ascOrderedWeights.length - 1; i++) {
        let firstNumber = ascOrderedWeights[i]
        let secondNumber = null
        let k = j + 1

        while (ascOrderedWeights[k] && ascOrderedWeights[j].weight == ascOrderedWeights[k].weight)
            k++

        if (k == j + 1)
            secondNumber = ascOrderedWeights[j]
        else
            secondNumber = ascOrderedWeights.slice(j, k).sort((a, b) => a.index - b.index)[0]

        let firstNumberWeight = firstNumber.weight
        let secondNumberWeight = secondNumber.weight
        let firstNumberIndex = firstNumber.index
        let secondNumberIndex = secondNumber.index

        if (firstNumberWeight != secondNumberWeight) {
            if (secondNumberWeight < firstNumberWeight) {
                const temp = firstNumber
                firstNumber = secondNumber
                secondNumber = temp
                firstNumberWeight = firstNumber.weight
                secondNumberWeight = secondNumber.weight
                firstNumberIndex = firstNumber.index
                secondNumberIndex = secondNumber.index
            }
        } else if (secondNumberIndex < firstNumberIndex) {
            const temp = firstNumber
            firstNumber = secondNumber
            secondNumber = temp
            firstNumberWeight = firstNumber.weight
            secondNumberWeight = secondNumber.weight
            firstNumberIndex = firstNumber.index
            secondNumberIndex = secondNumber.index
        }

        const weightsDifference = Math.abs(firstNumberWeight - secondNumberWeight)
        if (weightsDifference < min.weightsDifferences) {
            min = {
                weightsDifferences: weightsDifference,
                subArrays: [
                    [firstNumberWeight, firstNumberIndex, parseInt(firstNumber.value)],
                    [secondNumberWeight, secondNumberIndex, parseInt(secondNumber.value)]
                ]
            }
        } else if (weightsDifference == min.weightsDifferences && firstNumberWeight <= min['subArrays'][0][0]) {

            if (firstNumber.index < secondNumber.index && firstNumber.index <= min['subArrays'][0][1] && secondNumber.index < min['subArrays'][1][1]) {
                min['subArrays'][0] = [secondNumberWeight, secondNumberIndex, parseInt(secondNumber.value)]
                min['subArrays'][1] = [firstNumberWeight, firstNumberIndex, parseInt(firstNumber.value)]
                swapPairs(min)
            } else if (secondNumber.index <= min['subArrays'][1][1] && firstNumber.index < min['subArrays'][0][1]) {
                min['subArrays'][0] = [secondNumberWeight, secondNumberIndex, parseInt(secondNumber.value)]
                min['subArrays'][1] = [firstNumberWeight, firstNumberIndex, parseInt(firstNumber.value)]
                swapPairs(min)
            }
        }
        j++
    }
    return min['subArrays']
}

function swapPairs(min) {
    if (min['subArrays'][0][0] != min['subArrays'][1][0] && min['subArrays'][0][0] > min['subArrays'][1][0]) {
        let temp = min['subArrays'][0]
        min['subArrays'][0] = min['subArrays'][1]
        min['subArrays'][1] = temp
    }
    if (min['subArrays'][0][1] > min['subArrays'][1][1]) {
        let temp = min['subArrays'][0]
        min['subArrays'][0] = min['subArrays'][1]
        min['subArrays'][1] = temp
    }
}