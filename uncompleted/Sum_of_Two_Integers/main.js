function add(x, y) {

  console.log(x, y)
  let a = ((x >= 0 ? x : -x) + '').split('').reverse()
  let b = ((y >= 0 ? y : -y) + '').split('').reverse()

  if ((x < 0 && y > 0) || (y < 0 && x > 0)) {
    return sub(x, y)
  }
  if (a.length > b.length) {
    let temp = a
    a = b
    b = temp
  }

  let i = 0
  let add = ''
  let retenu = 0
  while (a[i] != null) {
    const u = +a[i]
    const v = +b[i]
    const sum = u + v + retenu
    add = (sum % 10) + add
    retenu = parseInt(sum / 10)
    i++
  }

  while (b[i] != null) {
    const u = +b[i]
    const sum = u + retenu
    add = (sum % 10) + add
    retenu = parseInt(sum / 10)
    i++
  }
  if (retenu)
    add = retenu + add
  if (x < 0 && y < 0)
    add = '-' + add
  return +add // Do your magic!
}

function sub(x, y) {

  if (Math.abs(x) < Math.abs(y)) {
    const temp = x
    x = y
    y = temp
  }

  let a = ((x >= 0 ? x : -x) + '').split('').reverse()
  let b = ((y >= 0 ? y : -y) + '').split('').reverse()

  /*
    si le plus grand nombre contient le signe '-' alors on fait une soustraction avec retenu  et on ajoute le '-' au resultat
    sinon, on fait la soustraction mais on n'ajoute pas le '-' à la fin
  */
  let i = 0
  let retenu = 0
  let arr = ''
  while (b[i] != null) {
    const pa = +a[i]
    const pb = +b[i]
    if (pb + retenu > pa) {
      arr = ((10 + pa) - (pb + retenu)) + arr
      retenu = 1
    }
    else {
      arr = (pa - (pb + retenu)) + arr
      retenu = 0
    }
    i++
  }
  while (a[i] != null) {
    if (+a[i] < retenu) {
      arr = ((10 + +a[i]) - retenu) + arr
      retenu = 1
    }
    else {
      arr = (+a[i] - retenu) + arr
      retenu = 0
    }
    i++
  }

  if (arr[0] == 0)
    arr = arr.substring(1)
  if (x < 0)
    arr = '-' + arr
  return +arr
}

console.log(add(-98013311, 1018035112))