let cakes = function (recipe, available) {
  let cloneRecipe = { ...recipe }, cloneAvailable = { ...available }, count = -1

  let quit = false
  while (!quit) {
    count++
    for (const item in cloneRecipe) {
      if (!cloneAvailable[item])
        return count
      cloneAvailable[item] -= cloneRecipe[item]
      if (cloneAvailable[item] < 0) {
        quit = true
        break
      }
    }
  }
  return count
}

cakes = function (recipe, available) {
  let minNum = []
  for (const item in recipe) {
    if (!available[item])
      return 0
    minNum.push(Math.floor(available[item] / recipe[item]))
  }
  return minNum.length ? Math.min(...minNum) : 0
}

recipe = { flour: 500, sugar: 200, eggs: 1 };
available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };
console.log(cakes({ flour: 500, sugar: 200, eggs: 1 }, { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }), 2);
