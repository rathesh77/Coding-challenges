const assert = require('assert')
const f = require('./main')
const solve = (X,Y,Z)=>(X+1)*(Y+1)*Z + (X+1)*Y*(Z+1) + X*(Y+1)*(Z+1);

describe("Example test", function() {
  it("2*1*1", function() {
    assert.strictEqual(f(2,1,1), 20);
  });

  it("1*2*3", function() {
    assert.strictEqual(f(1,2,3), 46);
  });
  
  it("2*2*2", function() {
    assert.strictEqual(f(2,2,2), 54);
  });
});

describe("Random test", function() {
  for(i=0;i<1000;i++){
    let X=Math.floor(Math.random()*(2**16-1))+1,
        Y=Math.floor(Math.random()*(2**16-1))+1,
        Z=Math.floor(Math.random()*(2**16-1))+1;
    it(`${X}*${Y}*${Z}`, function() {
      assert.strictEqual(f(X,Y,Z), solve(X,Y,Z));
    });
  }
});