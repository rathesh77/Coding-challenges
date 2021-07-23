
const dragRace = require('./main')
const assert = require('assert')
class Car {
    constructor(reactionTime, acceleration, topSpeed) {
        this.reactionTime = reactionTime
        this.acceleration = acceleration
        this.topSpeed = topSpeed
    }
}
describe("Basic tests", function () {
    const ANNA = new Car(1, 20, 20);
    const BOB = new Car(2, 10, 40);
    let [_ANNA, _BOB] = [Object.assign({}, ANNA), Object.assign({}, BOB)];

    it("Anna beats Bob", function () {
        assert.equal(dragRace(90, _ANNA, _BOB), "Anna is the winner",
            `Anna should win in 6 seconds`);
    });
    it("Bob beats Anna", function () {
        assert.equal(dragRace(120, _ANNA, _BOB), "Bob is the winner",
            `Bob should win in 7 seconds`);
    });
    it("Draw", function () {
        assert.equal(dragRace(100, _ANNA, _BOB), "It's a draw",
            `Both should take 6.5 seconds`);
    });
});

describe("Early finish tests", function () {
    const ANNA = new Car(1, 10, 120);
    const BOB = new Car(3, 40, 120);
    let [_ANNA, _BOB] = [Object.assign({}, ANNA), Object.assign({}, BOB)];

    it("Anna beats Bob", function () {
        assert.equal(dragRace(45, _ANNA, _BOB), "Anna is the winner",
            `Anna should win in 4 seconds`);
    });
    it("Bob beats Anna", function () {
        assert.equal(dragRace(180, _ANNA, _BOB), "Bob is the winner",
            `Bob should win in 6 seconds`);
    });
    it("Draw", function () {
        assert.equal(dragRace(80, _ANNA, _BOB), "It's a draw",
            `Both should take 5 seconds`);
    });
});

describe("Random tests", function () {
    const r = _ => Math.random();
    const f = _ => Math.floor(_);

    for (let i = 1; i <= 50; i++) {
        let len = f(r() * 10 + 5);
        let anna = new Car(f(r() * 2 + 1), f(r() * 3 + 1), f(r() * 6 + 4));
        let bob = new Car(f(r() * 2 + 2), f(r() * 4 + 1), f(r() * 6 + 6));
        let [_len, _anna, _bob] = [len, Object.assign({}, anna), Object.assign({}, bob)];

        it(`Random small test #${i}`, function () {
            logFunc(len, anna, bob, 0);
            assert.equal(dragRace(_len, _anna, _bob), testFunc(len, anna, bob),
                `Test failed`);
        });
    }

    for (let i = 1; i <= 50; i++) {
        let len = r() * 500 + 40;
        let anna = new Car(r() * 1, r() * 15 + 3, r() * 80 + 20);
        let bob = new Car(r() * 3, r() * 25 + 5, r() * 120 + 20);
        let [_len, _anna, _bob] = [len, Object.assign({}, anna), Object.assign({}, bob)];

        it(`Random normal test #${i}`, function () {
            logFunc(len, anna, bob, 1);
            assert.equal(dragRace(_len, _anna, _bob), testFunc(len, anna, bob),
                `Test failed`);
        });
    }

    function logFunc(len, anna, bob, n) {
        console.log(`Track length: ${len.toFixed(n)}m`);
        console.log(`Anna [reaction time ${anna.reactionTime.toFixed(n)}s, 
        acceleration ${anna.acceleration.toFixed(n)}m/s2, 
        top speed ${anna.topSpeed.toFixed(n)}m/s`);
        console.log(`Bob  [reaction time ${bob.reactionTime.toFixed(n)}s, 
        acceleration ${bob.acceleration.toFixed(n)}m/s2, 
        top speed ${bob.topSpeed.toFixed(n)}m/s`);
    }

    function testFunc(len, anna, bob) {
        function time({ reactionTime: tr, acceleration: a, topSpeed: vmax }) {
            let sa = vmax ** 2 / (2 * a);
            let ta = Math.sqrt(2 * Math.min(sa, len) / a);
            let tv = Math.max(len - sa, 0) / vmax;
            return tr + ta + tv;
        }
        let annaTime = time(anna);
        let bobTime = time(bob);
        if (annaTime == bobTime) return "It's a draw";
        if (annaTime < bobTime) return "Anna is the winner";
        return "Bob is the winner";
    }
});