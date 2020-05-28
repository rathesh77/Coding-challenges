
let temporarySnail = [];
snail = function (array) {
  
  clockWise(array);
  const snail = temporarySnail;
  temporarySnail = [];
  return snail;
}


function clockWise(array) {
  let arr;
  for (let i = 0; i < array.length; i++) {
    if (i == 0)
      arr = array[i];
    else if (i != array.length - 1)
      arr = [array[i].slice().reverse()[0]];
    else
      arr = array[i].slice().reverse();
    for (let j = 0; j < arr.length; j++)
      temporarySnail.push(arr[j]);

  }
  for (let i = array.length - 2; i > 0; i--) 
    temporarySnail.push(array[i][0])

  if (array.length < 3)
    return;
  clockWise(getSnail(array));
}
function getSnail(array) {
  let innerSnail = [];

  for (let i = 1; i < array.length - 1; i++) {
    innerSnail.push([]);
    for (let j = 1; j < array[i].length - 1; j++) 
      innerSnail[innerSnail.length - 1].push(array[i][j]);
  }
  return innerSnail;
}

console.log(snail([[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]))