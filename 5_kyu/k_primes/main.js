const countKprimes = function (k, start, nd) {

  let kprimes = []
  let primeNumbers = []

  for (let i = 0; i < Math.sqrt(nd); i++) {
    if (isPrimeNumber(i)) {
      primeNumbers.push(i)
    }
  }
  for (let i = start; i <= nd; i++)
    if (whatIsKOf(i, [...primeNumbers]) == k)
      kprimes.push(i)

  return kprimes
}

const whatIsKOf = function (number, primeNumbers) {
  let i = 0, countPrimes = 0
  while (!isPrimeNumber(number) && number > 1) {
    if (number % primeNumbers[i] != 0) {
      i++
      continue
    }
    number /= primeNumbers[i]
    countPrimes++
  }
  return countPrimes + 1
}

const isPrimeNumber = function (number) {
  if (number == 2) {
    return true
  }
  if (number % 2 == 0 || number < 2)
    return false
  for (let i = 3; i * i <= number; i += 2) {
    if (number % i == 0)
      return false
  }
  return true
}
const puzzle = function (s) {
  const onePrimes = countKprimes(1, 2, s)
  const threePrimes = countKprimes(3, 2, s)
  const sevenPrimes = countKprimes(7, 2, s)
  let count = 0
  //console.log('1-prime + 3-prime + 7-prime = '+s)
  for (let i = 0; i < onePrimes.length; i++) {
    let onePrime = onePrimes[i]
    for (let j = 0; j < threePrimes.length; j++) {
      let threePrime = threePrimes[j]
      for (let k = 0; k < sevenPrimes.length; k++) {
        let sevenPrime = sevenPrimes[k]
        if (sevenPrime + threePrime + onePrime === s) {
          count++
          //console.log(`[${onePrime} + ${threePrime} + ${sevenPrime}]`)
        }
      }
    }
  }
  return count
}
module.exports = { countKprimes, puzzle }