
const { countKprimes, puzzle } = require('./main.js')

function testing(actual, expected) {
    require('chai').expect(actual).deep.to.equal(expected);
}
function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}
//................
function primeFactors33(n) {
    let factors = [], i = 2;
    while (i * i <= n) {
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
        i++;
    }
    if (n > 1) factors.push(n);
    return factors.length;
}
function countKprimes33(k, start, nd) {
    let kprimes = [], i = start;
    while (i <= nd) {
        if (primeFactors33(i) === k)
            kprimes.push(i);
        i++;
    }
    return kprimes;
}
function puzzle33(s) {
    let a = countKprimes33(1, 0, s);
    let b = countKprimes33(3, 0, s);
    let c = countKprimes33(7, 0, s);
    let cnt = 0;
    let ia = 0;
    while (ia < a.length) {
        let ib = 0;
        while (ib < b.length) {
            let ic = 0;
            while (ic < c.length) {
                if (a[ia] + b[ib] + c[ic] === s)
                    cnt++;
                ic++;
            }
            ib++;
        }
        ia++;
    }
    return cnt;
}

function tests_code1() {
    for (let i = 0; i < 100; i++) {
        let n = randint(2, 8);
        let start = randint(2000000, 8000000);
        let end = start + randint(300, 600);
        testing(countKprimes(n, start, end), countKprimes33(n, start, end));
    }
}
function tests_code2() {
    for (let i = 0; i < 50; i++) {
        let n = randint(500, 800);
        testing(puzzle(n), puzzle33(n));
    }
}

describe("Basic tests", function () {
    it("countKprimes", function () {
        testing(countKprimes(2, 0, 100), [4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51,
            55, 57, 58, 62, 65, 69, 74, 77, 82, 85, 86, 87, 91, 93, 94, 95]);
        testing(countKprimes(3, 0, 100), [8, 12, 18, 20, 27, 28, 30, 42, 44, 45, 50, 52, 63, 66, 68, 70, 75, 76,
            78, 92, 98, 99]);
        testing(countKprimes(5, 1000, 1100), [1020, 1026, 1032, 1044, 1050, 1053, 1064, 1072, 1092, 1100]);
        testing(countKprimes(5, 500, 600), [500, 520, 552, 567, 588, 592, 594]);
        testing(countKprimes(7, 1000, 1500), [1008, 1056, 1080, 1088, 1120, 1200, 1216, 1248, 1458, 1472]);
        testing(countKprimes(7, 10000, 10100), [10032, 10044, 10048]);
        testing(countKprimes(7, 100000, 100100), [100008, 100016, 100035, 100048, 100064, 100100]);
        testing(countKprimes(12, 100000, 100100), []);
        testing(countKprimes(1, 2, 30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
        testing(countKprimes(8, 10000000, 10000200), [10000096, 10000152, 10000165, 10000200]);
    })
})

describe("Random tests countKprimes and puzzle", function () {
    it("countKprimes", function () {
        tests_code1();
    })

    it("puzzle", function () {
        tests_code2();
    })
    tests_code2();
})