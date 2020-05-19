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
};

function getPINs(observed) {
  var comb = [observed]
  console.log('┌───┬───┬───┐\n'+
              '│ 1 │ 2 │ 3 │\n'+
              '├───┼───┼───┤\n'+
              '│ 4 │ 5 │ 6 │\n'+
              '├───┼───┼───┤\n'+
              '│ 7 │ 8 │ 9 │\n'+
              '└───┼───┼───┘\n'+
              '    │ 0 │\n'+
              '    └───┘');
              
  console.log('Ci-dessous sont enumerés la liste des combinaisons adjacentes possibles avec le code '+ observed);

  for (var i = 0; i < observed.length; i++)
    for (var j = 0; j < variations[observed[i]].length; j++)
      combinationsFrom(variations[observed[i]][j].toString(), observed, i, comb);

  return comb.sort((a, b) => a - b);
}

function combinationsFrom(digit, observed, index, comb) {
  observed = observed.substr(0, index) + digit + observed.substr(index + 1, observed.length);
  comb.push(observed);
  for (var x = index + 1; x < observed.length; x++)
    for (var y = 0; y < variations[observed[x]].length; y++)
      combinationsFrom(variations[observed[x]][y], observed, x, comb);
}

var currentTime = new Date().getTime();
console.table(getPINs(Math.floor(Math.random()*1000).toString()));
console.log("\nTemps d'execution: "+(new Date().getTime()-currentTime)/1000 +" secondes");