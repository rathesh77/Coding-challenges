function generateHashtag(str) {
  if (str.length === 0)
    return false;

  str = str.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('')
  str = '#'.concat(str)
  return str.length > 140 || str === '#' ? false : str
}


console.log(generateHashtag('Do We have A Hashtag'))