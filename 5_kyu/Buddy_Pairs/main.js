function buddy(start, limit) {

  let arr = []
  let seen = []
  for (let i = start; i <= limit; i++) {

    let sumN = s(i, seen) - 1 // somme des diviseurs propres de N => s(n)
    let sumM = s(sumN, seen) - 1 // somme des diviseurs propres de M => s(m)
    if (sumM == i) {
     
      let min = Math.min(sumN,sumM)
      let max = Math.max(sumN,sumM)
      if ( min < start || min == max || min > limit)
      continue
      arr = [min,max]
     
      return arr
    }
  }
  return 'Nothing'
}

function s(number, seen) {
  if (seen[number]) {
    return seen[number]
  }
  let s = 1
 
  for (let i = 2; i <= parseInt(Math.sqrt(number)); i++) {
    if (number % i == 0) {
      s += i
      s += Math.ceil(number/i)
    }
  }

  seen[number] = s
  return s
}


console.log(buddy(48, 50), [48, 75]);

console.log(buddy(23, 4669), [48, 75]);
console.log(buddy(4952, 6539), [5775, 6128]);
console.log(buddy(381, 4318), [1050, 1925]);
console.log(buddy(2382, 3679), "Nothing");
console.log(buddy(100000, 200000));
console.log(buddy(1, 7041));

console.log(buddy(244 , 8840));
