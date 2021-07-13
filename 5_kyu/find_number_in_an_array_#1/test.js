const { duplicateOrUnique } = require('./main')
const chai = require('chai')
const expect = chai.expect

function an(arr) { //sum version
    for (var sum = 0, i = 0, len = arr.length; i < len; i++) sum += arr[i]
    var sum2 = len * (len - 1) / 2, len3 = (len + 1) / 2, sum3 = len3 * (len3 + 1)
    return sum >= sum3 ? sum - sum2 : sum3 - sum
}
function an1(arr) { //bit version
    for (var xor1 = 0, len = arr.length, xor2 = [len - 1, 1, 1 ^ (len - 1), 0][(len - 1) % 4], i = 0, half = ~~((len + 1) / 2), dup = false; i < len; i++) {
        xor1 ^= arr[i]
        if (!dup && arr[i] > half) dup = true
    }
    return dup ? xor1 ^ xor2 : xor1
}
function rndc() {
    var allc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return allc[~~(allc.length * Math.random())];
}
function rndc1() {
    var allc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ !@#$%^&*_(),.?|{}[]-=+\\/"
    return allc[~~(allc.length * Math.random())];
}
function rndclo() {
    var allc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_ !@#$%^&*_(),.?|{}[]-=+"
    return allc[~~(allc.length * Math.random())];
}
function rndcn() {
    var allc = "1234567890"
    return allc[~~(allc.length * Math.random())];
}
function rndcl() {
    var allc = "      abcdefghijklmnopqrstuvwxyz"
    return allc[~~(allc.length * Math.random())];
}
function rndcno() {
    var allc = "1234567890_ !@#$%^&*_(),.?|{}[]-=+"
    return allc[~~(allc.length * Math.random())];
}
function rndch() {
    var allc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return allc[~~(allc.length * Math.random())];
}
function rnd9() {
    var allc = "123456789";
    return allc[~~(allc.length * Math.random())];
}
function rnd10() {
    var allc = "0123456789";
    return allc[~~(allc.length * Math.random())];
}
function rnds(n) {
    var len = n || rand(5, 60), last = ""
    for (var i = 0, rs = []; i < len; i++) {
        var t = rndcl()
        while (last == t) t = rndcl()
        rs[i] = t;
        last = t
    }
    return rs.join("");
}
function rndss(n) {
    var len = n || rand(3, 7)
    for (var i = 0, rs = []; i < len; i++) rs[i] = rand(0, 1000) % 2 ? rndcl() : rndch();
    return rs.join("")
}
function rndsss(n) {
    var len = n || rand(5, 15)
    for (var i = 0, rs = []; i < len; i++) rs[i] = rnds();
    return rndch() + rs.join(" ")
}
function rndname() {
    return rndch() + rnds()
}
function shuff(arr) {
    for (var i = 0; i < 20; i++) {
        var idx1 = rand(0, arr.length - 1), idx2 = rand(0, arr.length - 1)
        var t = arr[idx1]
        arr[idx1] = arr[idx2]
        arr[idx2] = t
    }
}
function rnds2(n) {
    var len = n || ~~(15 * Math.random()) + 4;
    for (var i = 0, rs = []; i < len; i++) rs[i] = rndcl();
    return rs.join("");
}
function rand(from, to) {
    return Math.floor((to - from + 1) * Math.random() + from)
}
function rndarr() {
    var len1 = 98, len2 = 50, r1 = [], r2 = []
    var all = Array.from({ length: len1 }, (x, i) => i + 1)
    for (var i = 0; i < len1; i++) {
        var idx = rand(0, all.length - 1)
        r1[i] = all[idx]
        all.splice(idx, 1)
    }
    var all1 = Array.from({ length: len2 }, (x, i) => i + 1),
        all2 = Array.from({ length: len2 }, (x, i) => i + 1)
    for (var i = 0; i < len2; i++) {
        var idx = rand(0, all1.length - 1)
        r2[i] = all1[idx]
        all1.splice(idx, 1)
    }
    for (var i = len2; i < len2 * 2; i++) {
        var idx = rand(0, all2.length - 1)
        r2[i] = all2[idx]
        all2.splice(idx, 1)
    }
    return [r1, r2, len1, len2 * 2]
}

function rndarr2() {
    var len1 = 999998, len2 = 500000, len3 = 1000000, gap = ~~(len3 / 100), r1 = [], r2 = [], p10 = ~~(len3 / 10) - 1
    for (var p = 0, i = 0, allp1 = []; i < 9; i++) {
        var np = rand(p10 - gap, p10)
        allp1.push([p, p + np])
        p += np + 1
    }
    allp1.push([p, len1 - 1])
    for (var p = 0, i = 0, allp2 = []; i < 9; i++) {
        var np = rand(p10 - gap, p10)
        allp2.push([p, p + np])
        p += np + 1
    }
    allp2.push([p, len3 - 1])
    //console.log(allp1,allp2)

    var r1 = []
    for (var i = 0, j = 1; i < 10; i++) {
        var idx = rand(0, allp1.length - 1), [start, end] = allp1[idx]
        if (rand(0, 1)) {
            for (var k = start; k <= end; k++) r1[k] = j++
        }
        else {
            for (var k = end; k >= start; k--) r1[k] = j++
        }
        allp1.splice(idx, 1)
    }
    var r2 = []
    for (var i = 0, j = 1; i < 10; i++) {
        var idx = rand(0, allp2.length - 1), [start, end] = allp2[idx]
        if (rand(0, 1)) {
            for (var k = start; k <= end; k++) {
                r2[k] = j++
                if (j == len2 + 1) j = 1
            }
        }
        else {
            for (var k = end; k >= start; k--) {
                r2[k] = j++
                if (j == len2 + 1) j = 1
            }
        }
        allp2.splice(idx, 1)
    }
    //console.log(r1.length,r2.length)
    return [r1, r2, len1, len3]
}
var [testarr3, testarr4, testlen3, testlen4] = rndarr2()
//console.log(testarr3.length,testarr4.length,testlen3,testlen4)
function rndtest() {
    var [testarr1, testarr2, testlen1, testlen2] = rndarr()
    if (rand(0, 1000) % 2 == 0) {
        var len = testlen1, split = rand(0, len - 1), idx = rand(0, len - 1)
        return [testarr1.slice(0, split).concat(testarr1[idx], testarr1.slice(split)), testarr1[idx]]
    }
    var len = testlen2, idx = rand(0, len - 1), r = testarr2.slice()
    r.splice(idx, 1)
    return [r, testarr2[idx]]
}
function rndtest2() {
    if (rand(0, 1000) % 2 == 0) {
        var len = testlen3, split = rand(0, len - 1), idx = rand(0, len - 1)
        return [testarr3.slice(0, split).concat(testarr3[idx], testarr3.slice(split)), testarr3[idx]]
    }
    var len = testlen4, idx = rand(0, len - 1), r = testarr4.slice()
    r.splice(idx, 1)
    return [r, testarr4[idx]]
}
function showResult(s, color = "00cc00", who = "Your") {

}

describe("Basic Tests", function () {
    it("It should works for basic tests", function () {
        expect(duplicateOrUnique([1, 2, 3, 6, 5, 4, 1])).deep.to.equal(1);
        expect(duplicateOrUnique([1, 2, 3, 1, 2, 3, 4])).deep.to.equal(4);
        expect(duplicateOrUnique([1, 2, 3, 6, 5, 4, 6])).deep.to.equal(6);
        expect(duplicateOrUnique([3, 6, 9, 2, 5, 8, 1, 4, 8, 7])).deep.to.equal(8);
        expect(duplicateOrUnique([9, 8, 7, 1, 2, 3, 9, 7, 1, 2, 3, 4, 4, 5, 5, 6, 6])).deep.to.equal(8);

    })
})
//Test.assertEquals
//Test.assertSimilar
var failed = 0

describe("100 Random Tests --- Testing for correctness of solution", function () {
    it("It should works for random tests too.", function () {

        for (var iii = 0; iii < 100; iii++) {
            var [eee, ans] = rndtest()

            //var ans=an(eee)
            var useran = duplicateOrUnique(eee)
            //if(ans=="Test case may contains bugs, please post comment to the author ;-)")failed++ 
            //if(ans!=useran)failed++  
            if (JSON.stringify(ans) != JSON.stringify(useran)) failed++
            expect(useran).deep.to.equal(ans);

        }
    });

});

describe("100 Random Tests --- Testing for code performance", function () {
    it("Your code should run as fast as a rocket ;-)", function () {

        for (var iii = 0; iii < 100; iii++) {
            var [eee, ans] = rndtest2()

            //var ans=an(eee)
            var time1 = new Date()
            var useran = duplicateOrUnique(eee)
            var time2 = (new Date() - time1)
            //if(ans=="Test case may contains bugs, please post comment to the author ;-)")failed++ 
            //if(ans!=useran)failed++  
            if (JSON.stringify(ans) != JSON.stringify(useran)) failed++
            if (time2 > 6) {
                failed++
                expect(time2 + "ms", "Less than 6ms per testcase").deep.to.equal("You code is too slow ;-)");

            }
            else {
                expect(time2 + "ms", "Less than 6ms per testcase").deep.to.equal(time2 + "ms");

            }
            expect(useran).deep.to.equal(ans);

        }
    });
});
