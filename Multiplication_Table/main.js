multiplicationTable = function (size) {
  var table = [];
  for (var i = 1; i <= size; i++) {
    table.push([]);
    for (var j = 1; j <= size; j++)
      table[table.length - 1].push(i * j);
  }
  return table;
}
