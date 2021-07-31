function score(dice) {
    let score = 0
    let dices = {
        '1': { count: 0, rules: { '1': 100, '3': 1000 } },
        '2': { count: 0, rules: { '3': 200 } },
        '3': { count: 0, rules: { '3': 300 } },
        '4': { count: 0, rules: { '3': 400 } },
        '5': { count: 0, rules: { '1': 50, '3': 500 } },
        '6': { count: 0, rules: { '3': 600 } }
    }
    for (let i = 0; i < dice.length; i++)
        dices[dice[i]]['count']++

    for (const diceValue of Object.keys(dices)) {
        const count = dices[diceValue]['count']
        if (count === 0)
            continue
        const rules = dices[diceValue]['rules']
        const diff = count % 3
        const remains = count - (count - diff)
        if (count >= 3)
            score += (3 * rules['3']) / (count - diff)
        if (rules['1'] != null)
            score += remains * rules['1']
    }
    return score
}

console.log(score([5, 1, 3, 4, 1]), 250)
console.log(score([1, 1, 1, 3, 1]), 1100)
console.log(score([2, 4, 4, 5, 4]), 450)