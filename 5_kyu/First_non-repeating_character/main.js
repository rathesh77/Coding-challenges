function firstNonRepeatingLetter(s) {

  if (s.length == 0)
    return '';
  let seen = [];

  s.split('').forEach((element) => {
    let letter = element.toLowerCase();
    if (seen[letter])
      s = deleteRepeatingLetter(s, letter);
    seen[letter] = true;
  })

  let finalLetter = s.split('').filter(letter => letter != " ")[0];

  if (finalLetter == undefined)
    return '';

  return finalLetter;
}
function deleteRepeatingLetter(s, letter) {

  for (let x = 0; x < s.length; x++) {
    if (s[x].toLowerCase() == letter.toLowerCase()) {
      s = s.replace(s[x], ' ');
    }
  }
  return s;
}

console.log(firstNonRepeatingLetter("Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.")); // 4 3 2 1
