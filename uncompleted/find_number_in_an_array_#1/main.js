
function duplicateOrUnique(arr) {
  //coding and coding..
  const n = arr.length

  quicksort(arr, 0, arr.length-1)
  console.log(arr)

  if (arr[n-1]  == n-1 ) {
    // un seul element dupliqué !!!
    for ( let i = 1 ; i < arr.length-1;i++) {
      if ( arr[i] == arr[i+1] || arr[i] == arr[i-1]) {
        return arr[i]
      }
    }
  }
  for ( let i = 1 ; i < arr.length-1;i++) {
    if ( arr[i] != arr[i+1] && arr[i] != arr[i-1]) {
      console.log(arr[i-1], arr[i],arr[i+1])
      return arr[i]
    }
  }
  return arr[n-1]

}

function quicksort(array, begin, end) {
  if (begin < end) {
      const j = partition(array, begin, end)
      quicksort(array, begin, j - 1)
      quicksort(array, j + 1, end)

  }
}

function partition(array, begin, end) {
  const pivotIndex = parseInt((begin + end) / 2)
  let pivot = array[pivotIndex]

  let i = begin
  let j = end

  swap(array, begin, pivotIndex)

  while (i < j) {
      while (array[i] <= pivot) {
          i++
      }
      while (array[j] > pivot) {
          j--
      }
      if (i < j) {
          swap(array, i, j)
      }
  }
  swap(array, begin, j)
  return j
}
function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

console.log(duplicateOrUnique([1, 2, 3, 1, 2, 3, 4]), 4)
//console.log(duplicateOrUnique([9, 8, 7, 1, 2, 3, 9, 7, 1, 2, 3, 4, 4, 5, 5, 6, 6]), 8)
//console.log(duplicateOrUnique([1, 2, 3, 6, 5, 4, 1]), 1)


// 1 +2 +3 +4 = 10 => n(n+1) / 2 