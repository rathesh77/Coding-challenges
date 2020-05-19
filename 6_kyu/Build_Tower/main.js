function towerBuilder(nFloors) {
  var result = [];
  for (var i = nFloors; i > 0; i--) {
    result.push(' '.repeat(nFloors - i) + '*'.repeat((nFloors * 2) - (((nFloors - i) * 2) + 1)) + ' '.repeat(nFloors - i));
  }
  return result.reverse();
}
console.log(towerBuilder(10))