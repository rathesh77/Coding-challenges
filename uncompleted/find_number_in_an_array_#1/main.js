function duplicateOrUnique(arr) {
  //coding and coding..

  // trouver le type de tableau si une seule valeur unique ou une valeur dupliqué
  // arr.sort();

console.log(arr.sort())
  return arr.length == arr[arr.length - 1] + 1 ? findDuplicate(arr) : findUnique(arr);
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
  var left = Math.floor(arr.length-1/2)-1 ,right =  Math.floor(arr.length/2) +1
  console.log('Unique')

  while ( left >= 0 && right < arr.length-1 )
  {
    if ( arr[left] != arr[left+1])
    {

      if (arr[left] == arr[left-1])
      {
        return arr[left+1]
      }
      else
      {
        return arr[left-1]

      }
    }
    if ( arr[left] != arr[left-1])
    {
      if (arr[left] == arr[left+1])
      {
        return arr[left-1]
      }
      else
      {
        return arr[left+1]

      }
    }

    left--
    right++
  }
  

}


console.log(duplicateOrUnique( [39,20,23,45,2,26,49,5,41,13,46,15,12,27,50,47,40,34,4,48,31,1,33,19,18,24,30,8,16,3,29,28,11,43,22,38,21,17,9,25,7,36,42,37,35,32,10,14,44,24,15,14,47,32,44,7,28,26,16,34,35,50,17,23,48,2,3,1,9,31,45,10,6,4,5,22,25,39,27,42,37,8,29,40,20,46,49,36,19,33,30,12,38,43,18,21,11,41,13] ))

