const parseInt = require('./main')
const assert = require('assert')
describe("Fixed tests", function() {
    it("asserts", function() {
      assert.strictEqual(parseInt('zero'), 0);
      assert.strictEqual(parseInt('one'), 1);
      assert.strictEqual(parseInt('two'), 2);
      assert.strictEqual(parseInt('three'), 3);
      assert.strictEqual(parseInt('four'), 4);
      assert.strictEqual(parseInt('five'), 5);
      assert.strictEqual(parseInt('six'), 6);
      assert.strictEqual(parseInt('seven'), 7);
      assert.strictEqual(parseInt('eight'), 8);
      assert.strictEqual(parseInt('nine'), 9);
      assert.strictEqual(parseInt('ten'), 10);
      assert.strictEqual(parseInt('twenty'), 20);
      assert.strictEqual(parseInt('twenty-one'), 21);
      assert.strictEqual(parseInt('thirty-seven'), 37);
      assert.strictEqual(parseInt('forty-six'), 46);
      assert.strictEqual(parseInt('fifty-nine'), 59);
      assert.strictEqual(parseInt('sixty-eight'), 68);
      assert.strictEqual(parseInt('seventy-two'), 72);
      assert.strictEqual(parseInt('eighty-three'), 83);
      assert.strictEqual(parseInt('ninety-four'), 94);
      assert.strictEqual(parseInt('one hundred'), 100);
      assert.strictEqual(parseInt('one hundred one'), 101);
      assert.strictEqual(parseInt('one hundred and one'), 101);
      assert.strictEqual(parseInt('one hundred sixty-nine'), 169);
      assert.strictEqual(parseInt('two hundred and ninety-nine'), 299);
      assert.strictEqual(parseInt('seven hundred thirty-six'), 736);
      assert.strictEqual(parseInt('two thousand'), 2000);
      assert.strictEqual(parseInt('one thousand three hundred and thirty-seven'), 1337);
      assert.strictEqual(parseInt('twenty-six thousand three hundred and fifty-nine'), 26359);
      assert.strictEqual(parseInt('thirty-five thousand'), 35000);
      assert.strictEqual(parseInt('ninety-nine thousand nine hundred and ninety-nine'), 99999);
      assert.strictEqual(parseInt('six hundred sixty-six thousand six hundred sixty-six'), 666666);
      assert.strictEqual(parseInt('seven hundred thousand'), 700000);
      assert.strictEqual(parseInt('two hundred thousand three'), 200003);
      assert.strictEqual(parseInt('two hundred thousand and three'), 200003);
      assert.strictEqual(parseInt('two hundred three thousand'), 203000);
      assert.strictEqual(parseInt('five hundred thousand three hundred'), 500300);
      assert.strictEqual(parseInt('eight hundred eighty-eight thousand eight hundred and eighty-eight'), 888888);
      assert.strictEqual(parseInt('one million'), 1000000);
    });
  });
  
  function solution(string) {
    let r = 0, temp = 0, d = {"zero":0, "one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"thirteen":13,"fourteen":14,"fifteen":15,"sixteen":16,"seventeen":17,"eighteen":18,"nineteen":19,"twenty":20,"thirty":30,"forty":40,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90, "hundred":100, "thousand":1000, "million":1000000};
    string = string.replace(/ and /g, " ").replace(/-/g, " ").split(" ");
    for (let i = 0; i < string.length; i++) {
      let x = string[i];
      if (["hundred", "thousand", "million"].includes(string[i])) {
        temp *= d[x];
        if (["thousand", "million"].includes(x) || !(string.slice(i+1).includes("thousand") || string.slice(i+1).includes("million"))) {
          r += temp;
          temp = 0;
        }
      } else {
        temp += d[x];
      }
    }
    return r + temp;
  }
  
  function format(s, a) {
    for (let x of a) {
      s = s.replace("{}", x[~~(Math.random() * x.length)])
    }
    return s;
  }
  
  describe("Random asserts", function() {
    it("asserts", function() {
      const ones = ["one","two","three","four","five","six","seven","eight","nine"];
      const teens = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
      const tens = ["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    
      for (let i = 0; i < 50; i++) {
        let line = format("{}", [Math.random() > 0.5 ? ones : teens]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{}-{}", [tens, ones]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{} hundred{}{}-{}", [ones, [" ", " and "], tens, ones]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{} thousand {} hundred{}{}-{}", [ones, ones, [" ", " and "], tens, ones]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{}-{} thousand {} hundred{}{}-{}", [tens, ones, ones, [" ", " and "], tens, ones]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{} hundred{}{}-{} thousand {} hundred{}{}-{}", [ones, [" ", " and "], tens, ones, ones, [" ", " and "], tens, ones]);
        assert.strictEqual(parseInt(line), solution(line));
      }
      
      for (let i = 0; i < 100; i++) {
        let line = format("{} hundred{}{}-{} thousand {} hundred{}{}", [ones, [" ", " and "], tens, ones, ones, [" ", " and "], teens]);
        assert.strictEqual(parseInt(line), solution(line));
      }
    });
  });