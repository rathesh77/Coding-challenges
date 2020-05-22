function whoIsNext(names, r) {

  const firstValueOfSerie = names.length;
  let counter = 0;
  while (firstValueOfSerie * ((1 - Math.pow(2, counter)) / (1 - 2)) < r) 
    counter++;
  
  const numPow = Math.floor((firstValueOfSerie * Math.pow(2, counter - 1)) / names.length);
  const firstDrinker = (firstValueOfSerie * ((1 - Math.pow(2, counter - 1)) / (1 - 2))) + 1;
  return names[parseInt((r - firstDrinker) / numPow)];
}

/* 
Sn = So * q**n
Sn =  5  * (  (1-Math.pow(2,n)  ) / (1 - 2 )    ) où q => raison = 2

    1               2                 4                                       8
 a b c d e  + aa bb cc dd ee + aaaa bbbb cccc dddd eeee + aaaaaaaa bbbbbbbb cccccccc dddddddd eeeeeeee
    5               10                  20                                40
*/

var currentTime = new Date().getTime();
console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 7230702951))
console.log("\nTemps d'execution: "+(new Date().getTime()-currentTime)/1000 +" secondes");
