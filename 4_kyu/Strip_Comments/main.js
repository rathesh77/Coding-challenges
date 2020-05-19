function solution(input, markers) {
  input = input.split('\n');

  for (var i = 0; i < input.length; i++)
    for (var j = 0; j < input[i].length; j++)
      if (markers.indexOf(input[i][j]) != -1)
        input[i] = removeCharactersAfter(j - 1, input[i]);

  return input.join('\n');
};
function removeCharactersAfter(i, input) {
  return input.substring(0, i);
};

console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]))