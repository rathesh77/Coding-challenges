function generateHashtag(str) {
  if (!isValidString(str))
    return false;

  str = str.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('')

  return '#'.concat(str).length > 140 ? false : '#'.concat(str);
}
function isValidString(str) {

  if (str.length == 0)
    return false

  var cptSpaces = 0
  for (var i = 0; i < str.length; i++) {

    if (str[i] == ' ')
      cptSpaces++

  }
  return cptSpaces != str.length
}

console.log(generateHashtag('Do We have A Hashtag'))