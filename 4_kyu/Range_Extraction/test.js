const solution = require('./rangeExtraction')
const chai = require('chai')
const expect = chai.expect

describe("Basic tests", function() {
    it("Should pass basic tests", function() {
      var list = solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
      var expected = "-6,-3-1,3-5,7-11,14,15,17-20"
      expect(list).deep.to.equal(expected);

      list = solution([-3,-2,-1,2,10,15,16,18,19,20])
      expected = '-3--1,2,10,15,16,18-20'
      expect(list, "[-3,-2,-1,2,10,15,16,18,19,20] should have returned '" + expected + "'").deep.to.equal(expected);

    });  
  });
  
  describe("Random tests", function() {
    it("Should pass random tests", function() {
    
      function solutionTester(list){
        var len = list.length;
        var out = [];
        var i, j;
       
        for (i = 0; i < len; i = j + 1) {
          // beginning of range or single
          out.push(list[i]);
       
          // find end of range
          for (var j = i + 1; j < len && list[j] == list[j-1] + 1; j++);
          j--;
       
          if (i == j) {
            // single number
            out.push(",");
          } else if (i + 1 == j) {
            // two numbers
            out.push(",", list[j], ",");
          } else { 
            // range
            out.push("-", list[j], ",");
          }
        }
        out.pop(); // remove trailing comma
        return out.join("");
      }
  
      for (let i = 0; i < 20; i++){
        let y = -Math.floor(Math.random() * 51) - 50,
            x = [y],
            z = Math.floor(Math.random() * 21) + 10;
        for (let j = 0; j < z; j++) {
          y += Math.floor(Math.random() * 3) + 1;
          x.push(y);
        }    
        expect(solution([...x]), "It should work for random inputs too").deep.to.equal(solutionTester(x));

      }
    });
  });