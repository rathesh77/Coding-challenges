function doubles(maxk, maxn) {
    let sum = 0  
    for (let i = 1; i <= maxk; i++) 
      for (let j = 1; j <= maxn; j++)
        sum += 1 / (i * Math.pow(j + 1, i + i))
    return sum
  }