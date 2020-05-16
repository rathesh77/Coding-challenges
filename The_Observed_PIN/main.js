var variations =
{
  '1': [2, 4],
  '2': [1, 3, 5],
  '3': [2, 6],
  '4': [1, 5, 7],
  '5': [2, 4, 6, 8],
  '6': [3, 5, 9],
  '7': [4, 8],
  '8': [0, 5, 7, 9],
  '9': [6, 8],
  '0': [8]
}
function getPINs(observed) {
  var comb = [observed]

  for (var i = 0; i < observed.length; i++)
    for (var j = 0; j < variations[observed[i]].length; j++)
      combinationsFrom(variations[observed[i]][j].toString(), observed, i, comb);

  return comb.sort((a, b) => a - b)
}
function combinationsFrom(digit, observed, index, comb) {
  observed = observed.substr(0, index) + digit + observed.substr(index + 1, observed.length)
  comb.push(observed)
  for (var x = index + 1; x < observed.length; x++)
    for (var y = 0; y < variations[observed[x]].length; y++)
      combinationsFrom(variations[observed[x]][y], observed, x, comb);
}
console.log(getPINs("8"))
