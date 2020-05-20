function duplicateOrUnique(arr) {
  //coding and coding..

  arr = arr.sort((a, b) => a - b)
  //console.log(arr)
  //console.log(Array.from(new Set(arr)))
  return isDuplicate(arr) ? findDuplicate(arr) : findUnique(arr);
}
function isDuplicate(arr) {
  return Array.from(new Set(arr)).length == arr.length - 1
}

function findDuplicate(arr) {
  var seen = [];
  console.log('Duplicate')

  for (var i = 0; i < arr.length; i++) {
    if (seen[arr[i]])
      return arr[i]
    else
      seen[arr[i]] = true
  }
}
function findUnique(arr) {
  console.log('Unique')
  var setted = Array.from(new Set(arr))
  var start = 0;
  var end = setted.length-1
  for (var i = 0; i < setted.length; i++) {
    var index = arr.indexOf(setted[i])
    if (index != -1 && arr.indexOf(setted[i], index + 1) == -1)
      return setted[i]
  }

}


console.log(duplicateOrUnique([1, 2, 3, 1, 2, 3, 4]))
/*
if ( sorted(Set from index I to end == original Array from I to end) )
dichotomie*/

