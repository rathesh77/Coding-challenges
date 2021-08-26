let i = -1
Boolean.prototype.valueOf = function() {
    i++
    return i % 2 == 0 ? false : true
}
const omnibool  = new Boolean(true)

console.log(omnibool  == false);
console.log(omnibool  == true);
