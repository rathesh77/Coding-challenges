snail = function (array) {
  return clockWise(array,[]);
}

let clockWise = function (array,temporarySnail) {
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
    return temporarySnail;
  return clockWise(getSnail(array),temporarySnail);
}

let getSnail = function (array) {
  let innerSnail = [];
  for (let i = 1; i < array.length - 1; i++) {
    innerSnail.push([]);
    for (let j = 1; j < array[i].length - 1; j++)
      innerSnail[innerSnail.length - 1].push(array[i][j]);
  }
  return innerSnail;
}

const input = [[1, 2, 3, 4, 5, 6], [4, 5, 6, 2, 0, 7], [2, 1, 8, 7, 9, 8], [4, 5, 6, 7, 1, 9], [2, 3, 4, 5, 8, 9], [9, 7, 1, 4, 3, 6]];
console.log("input: ");
input.forEach((element) => { console.log(...element); })
console.log("\nOutput: " + snail(input));



