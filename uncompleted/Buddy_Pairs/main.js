function buddy(start, limit) {

  var currentMillis = new Date().getTime()
  var seen = []
  for (var i = start; i <= limit; i++) {
    var somme = 0
    for (var j = 1; j <= i / 2; j++) {
      if (i % j == 0 && i != j) {
      somme+= j
      }
    }

    if (somme > i && !seen[somme]) {

      var is = isPairOf(somme - 1, i)
      if (is.isPair && somme > 1) {
        console.log((new Date().getTime() - currentMillis)/1000 + " secondes passées")
       return [is.next, somme - 1]
      }
      seen[somme] = true
    }
     
  }
  return "Nothing"

}
function isPairOf(n, origin) {
  var sum = 0
  for (var i = 1; i <= n/2; i++) {
    if (n % i == 0) {
      sum += i
    }
  }
  return { isPair: sum == origin + 1, next: sum - 1 }
}
console.log(buddy(100000, 200000));