function whoIsNext(names, r) {
  //your code here
  var currentDrinker = names[0]

  console.log(names)
  for (var i = 0; i < r - 1; i++) {

    names.shift()
    names.push(currentDrinker)
    currentDrinker = names[0]
  }
  return currentDrinker
}


console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 2))