var primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
function countKprimes(k, start, nd) {
  // your code
  //console.log(k)
  //console.log(start)
  //  console.log(nd)
  var kprimes = [];
  //  console.log(whatIsKOf(501))
  for (var i = start; i <= nd; i++) {
    //console.log(i)
    if (whatIsKOf(i) == k)
      kprimes.push(i);
  }

  return kprimes
}

function whatIsKOf(number) {
  var i = 0;
  var countPrimes = 0;
  while (number > 1) {

    if (number % primeNumbers[i] != 0) {
      if ( isPrimeNumber(number))
        return countPrimes + 1;
      i++;
      continue;
    }
    number /= primeNumbers[i];
    countPrimes++;
  }
  return countPrimes;
}

function isPrimeNumber(number)
{
  for ( var i = 2 ; i <= parseInt(Math.sqrt(number));i++)
  {
    if ( number % i == 0)
    return false;
  }
  return true
}
function puzzle(s) {
  // your code
  var one_prime = [];
  var three_prime = [];
  var seven_prime = []
  var count = 0;
  for (var i = 1; i <= s; i++) {

    if (whatIsKOf(i) == 1)
      one_prime.push(i)
    if (whatIsKOf(i) == 3)
      three_prime.push(i)
    if (whatIsKOf(i) == 7)
      seven_prime.push(i)
  }
  count += lookForSolutions(one_prime, three_prime, seven_prime,s) 

  //console.log(one_prime)
  //console.log(three_prime)
  //console.log(seven_prime)

  return count;
}
function lookForSolutions(one_prime, three_prime, seven_prime,s) {

  var count = 0;
  var seen = []
  for (var i = 0; i < one_prime.length; i++){
    for (var j = 0; j < three_prime.length; j++){
      for (var k = 0; k < seven_prime.length; k++)
      {
        if ( seen[one_prime[i]] && seen[three_prime[j]] && seen[seven_prime[k]])
        {
          break;
        }
        if ( one_prime[i] + three_prime[j] + seven_prime[k] == s)
        {
          count++;
         // console.log( one_prime[i])
         // console.log( three_prime[j])
        // console.log( seven_prime[k])
          seen[one_prime[i]] = true; 
          seen[three_prime[j]] = true; 
          seen[seven_prime[k]]= true;
        }

      }
      
    }
  }
      return count;
}
var currentTime = new Date().getTime();
console.log(countKprimes(5, 500, 600));
console.log(puzzle(138))
console.log("\nTemps d'execution: " + (new Date().getTime() - currentTime) / 1000 + " secondes");