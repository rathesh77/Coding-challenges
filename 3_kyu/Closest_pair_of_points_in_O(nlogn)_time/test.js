const closestPair = require('./main')
const assert = require('assert')

function calculateDistanceFunc(a, b) {
  var dx = (a[0] - b[0]);
  var dy = (a[1] - b[1]);
  return Math.sqrt(dx * dx + dy * dy);
}
    
describe("Sample tests", ()=> {

  it("Example", () => {
  
    var points = [
      [2,2], // A
      [2,8], // B
      [5,5], // C
      [6,3], // D
      [6,7], // E
      [7,4], // F
      [7,9]  // G
    ];

    var result = closestPair(points, calculateDistanceFunc);
    result.sort();
    assert.deepStrictEqual(result[0], [6,3]);
    assert.deepStrictEqual(result[1], [7,4]);
  });
  
  it("Two points", ()=> {
    var points = [
      [2,2], // A
      [2,8], // B
    ];

    var result = closestPair(points, calculateDistanceFunc);
    assert.deepStrictEqual( Array.isArray(result), true);
    result.sort();
    assert.deepStrictEqual(result[0], [2,2]);
    assert.deepStrictEqual(result[1], [2,8]);
  });
  
  it("Duplicated point", () => {
  
    var points = [
      [2,2], // A
      [2,8], // B
      [5,5], // C
      [5,5], // C
      [6,3], // D
      [6,7], // E
      [7,4], // F
      [7,9]  // G
    ];

    var result = closestPair(points, calculateDistanceFunc);
    result.sort();
    assert.deepStrictEqual(result[0], [5,5]);
    assert.deepStrictEqual(result[1], [5,5]);
  });
});

let generateRandomSet = function(gridSize, gridUnit, offset, scale) {
  
  let rapprox = function(value, deviation) {
    return value + deviation * 2 * Math.random() - deviation;
  }
  
  let points = [];
  let step = gridUnit * Math.pow(10, scale);
  let deviation = step * 0.25;
  let left = offset[0] * step;
  let top = offset[1] * step;
  
  for(let x=0; x<gridSize; ++x) {
    for(let y=0; y<gridSize; ++y) {
      let nx = rapprox(x * step + left, deviation);
      let ny = rapprox(y * step + top, deviation);
      points.push([nx, ny]);
    }
  }
  
  let idx = (Math.random() * points.length) | 0;
  let point = points[idx];
  let newPoint = [rapprox(point[0], deviation*0.9), rapprox(point[1], deviation*0.9)];
  points.push(newPoint);
  
  //rotate grid
  let angle = Math.PI * 2 * Math.random();
  let cx = step * gridSize * Math.random() + left;
  let cy = step * gridSize * Math.random() + top;
  for(let p of points) {
    let p0 = Math.cos(angle) * (p[0] - cx) - Math.sin(angle) * (p[1] - cy) + cx;
    let p1 = Math.sin(angle) * (p[0] - cx) + Math.cos(angle) * (p[1] - cy) + cy;
    p[0] = p0;
    p[1] = p1;
  }

  let shuffle = function(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
  }
  shuffle(points);
  
  let d = Math.hypot(point[0] - newPoint[0], point[1] - newPoint[1]);
  return { points: points, d: d, answer: [point.slice(0), newPoint.slice(0)]};
}

let makeInputSet = function(gridSize) {
  
  return [
      gridSize, 
      1 + Math.random() * 10, 
      [ ((2 * gridSize * Math.random()) | 0) - gridSize, ((2 * gridSize * Math.random()) | 0) - gridSize],
      (Math.random() * 6 - 3) | 0
      ];
  
}

let executeTest = function(repeats, size) {
  
  for(let i=0; i < repeats; ++i) {
    
    let testInput = generateRandomSet(...makeInputSet(size));
    testInput.answer.sort();
    
    testResult = closestPair(testInput.points, calculateDistanceFunc);
    testResult.sort();  
    assert.deepStrictEqual(testResult, testInput.answer);
  }
};


describe("Random tests", () => {

  it("Two points", () => { executeTest(5, 1); });
  it("Tiny set", () => { executeTest(5, 5); });
  it("Small set", () => { executeTest(5, 10); });
  it("Duplicated point", () => {
    for(let i=0; i < 5; ++i) {
    
      let testInput = generateRandomSet(...makeInputSet(10));
      let duped = testInput.points[(Math.random() * testInput.points.length) | 0].slice(0);
      let insertAt = (Math.random() * testInput.points.length) | 0;
      testInput.points.splice(insertAt, 0, duped);
      testInput.d = 0;
      testInput.answer = [duped, duped];
      
      testResult = closestPair(testInput.points, calculateDistanceFunc);
      testResult.sort();  
      assert.deepStrictEqual(testResult, testInput.answer);
    }
  });
  it("Medium set", () => { executeTest(5, 30); });
  it("Large set - performance tests", () => { executeTest(20, 200); });
});