function findUniq(arr) {
  // do magic
  var p = arr.sort()
  return p[0] == p[1] ? p[p.length-1] : p[0];
}

console.log(findUniq([1,1,1,1,2,1,1,1,1]))