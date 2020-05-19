function pigIt(str) {

  str = str.split(' ')

  for (var i = 0; i < str.length; i++) {
    if (str[i] == '?' || str[i] == '!')
      continue
    str[i] = str[i].concat(str[i][0], 'ay')
    str[i] = str[i].replace(str[i][0], '')
  }

  return str.join(' ')
}
console.log(pigIt('dzqpdzqdz sazzq d zqqdzq zqd '))