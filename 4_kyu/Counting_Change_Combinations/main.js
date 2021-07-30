const countChange = (money, coins) => findCombinations(money, 0, coins, 0)
const findCombinations = (money, change, coins, currentCoinIndex) => {
    const currentCoin = coins[currentCoinIndex]
    let combinations = 0
    const temp = change
    while (change + currentCoin < money) {
        change += currentCoin
        combinations += findCombinations(money, change, coins, currentCoinIndex + 1)
    }
    if (currentCoinIndex < coins.length - 1)
        combinations += findCombinations(money, temp, coins, currentCoinIndex + 1)
    return change + currentCoin === money ? combinations + 1 : combinations
}

console.log(countChange(4, [1, 2]), 3)
console.log(countChange(10, [5, 2, 3]), 4)
console.log(countChange(300, [5, 10, 20, 50, 100, 200, 500]), 1022)