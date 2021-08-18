function add(x, y) {

  let xbin = (x >>> 0).toString(2);
  let ybin = (y >>> 0).toString(2);

  let a = xbin.split('').reverse(), b = ybin.split('').reverse()

  if (a.length < b.length) {
    const temp = a
    a = b
    b = temp
  }

  let cpt = 0
  let finalNumber = ''
  let carry = '0'
  let res = ''
  while (cpt < b.length) {
    if (b[cpt] == '1' && a[cpt] == '1') {
      res = '0'
      if (carry == '1')
        res = '1'
      else
        carry = '1'
    }
    else if (b[cpt] == '1' && a[cpt] == '0' || b[cpt] == '0' && a[cpt] == '1') {
      res = '1'
      if (carry == '1') {
        res = '0'
      }
    } else {
      if (carry == '1') {
        res = '1'
        carry = '0'

      } else {
        res = '0'
        carry = '0'
      }
    }
    finalNumber = res.concat(finalNumber)
    cpt++
  }

  if (a.length == b.length) {
    if (carry == '1')
      finalNumber = '1'.concat(finalNumber)

    return parseInt(finalNumber, 2)
  }


  while (cpt < a.length) {

    if (a[cpt] == '1' && carry == '1') {
      res = '0'
      carry = '1'
    }
    else if (a[cpt] == '1' && carry == '0' || a[cpt] == '0' && carry == '1') {
      res = '1'
      carry = '0'
    } else {
      res = '0'
      carry = '0'
    }
    finalNumber = res.concat(finalNumber)
    cpt++
  }
  if (carry == '1')
    finalNumber = '1'.concat(finalNumber)

  console.log(xbin, ybin, finalNumber)
  return parseInt(finalNumber, 2)
}


console.log(add(15, 56))