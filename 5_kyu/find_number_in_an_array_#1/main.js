function duplicateOrUnique(arr) {
  let sum = 0
  const n = arr.length
  const expr1 = (n - 1) * n
  const expr2 = (n + 1) / 2

  for (let i = 0; i < n; i++)
    sum += arr[i]

  return sum > (expr1) / 2 ? sum - ((expr1) / 2) : (expr2 * (expr2 + 1)) - sum
}

module.exports = { duplicateOrUnique }
