// countChange is another user solution whereas countChange2 is my solution
// first solution looks cleaner but is in fact less efficient than the second one
var countChange = function (money, coins) {
    if (money < 0 || coins.length === 0)
        return 0
    else if (money === 0)
        return 1
    else
        return countChange(money - coins[0], coins) + countChange(money, coins.slice(1))
}

const countChange2 = (money, coins) => findCombinations(money, 0, coins, 0)
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

let time = Date.now()
console.log(countChange(1235, [5, 10, 20, 50, 100, 200, 500, 95]))
console.log(`Time elapsed when countChange ended : ${(Date.now() - time) / 1000} seconds`)

time = Date.now()
console.log(countChange2(1235, [5, 10, 20, 50, 100, 200, 500, 95]))
console.log(`Time elapsed when countChange2 ended : ${(Date.now() - time) / 1000} seconds`)
