function duplicateOrUnique(arr) {
  let sum = 0
  const n = arr.length
  const expr1 = (n - 1) * n
  const expr2 = (n + 1) / 2

  for (let i = 0; i < n; i++)
    sum += arr[i]

  return sum > (expr1) / 2 ? sum - ((expr1) / 2) : (expr2 * (expr2 + 1)) - sum
}

console.log(duplicateOrUnique([1, 2, 3, 1, 2, 3, 4]), 4)
console.log(duplicateOrUnique([9, 8, 7, 1, 2, 3, 9, 7, 1, 2, 3, 4, 4, 5, 5, 6, 6]), 8)
console.log(duplicateOrUnique([1, 2, 3, 6, 5, 4, 1]), 1)