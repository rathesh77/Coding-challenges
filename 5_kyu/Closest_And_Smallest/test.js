
const closest = require('./main')
const chai = require('chai')
const expect = chai.expect

function testing(actual, expected) {
    expect(actual).deep.to.equal(expected);
}

describe("Basic tests", function () {
    it("closest", function () {
        testing(closest(""), [])
        testing(closest("456899 50 11992 176 272293 163 389128 96 290193 85 52"), [[13, 9, 85], [14, 3, 176]]);
        testing(closest("239382 162 254765 182 485944 134 468751 62 49780 108 54"), [[8, 5, 134], [8, 7, 62]]);
        testing(closest("241259 154 155206 194 180502 147 300751 200 406683 37 57"), [[10, 1, 154], [10, 9, 37]]);
        testing(closest("89998 187 126159 175 338292 89 39962 145 394230 167 1"), [[13, 3, 175], [14, 9, 167]]);
        testing(closest("462835 148 467467 128 183193 139 220167 116 263183 41 52"), [[13, 1, 148], [13, 5, 139]]);

        testing(closest("403749 18 278325 97 304194 119 58359 165 144403 128 38"), [[11, 5, 119], [11, 9, 128]]);
        testing(closest("28706 196 419018 130 49183 124 421208 174 404307 60 24"), [[6, 9, 60], [6, 10, 24]]);
        testing(closest("189437 110 263080 175 55764 13 257647 53 486111 27 66"), [[8, 7, 53], [9, 9, 27]]);
        testing(closest("79257 160 44641 146 386224 147 313622 117 259947 155 58"), [[11, 3, 146], [11, 9, 155]]);
        testing(closest("315411 165 53195 87 318638 107 416122 121 375312 193 59"), [[15, 0, 315411], [15, 3, 87]]);

        testing(closest("140313 168 397948 9 17442 48 347136 55 34291 151 51"), [[12, 0, 140313], [12, 5, 48]]);
        testing(closest("258914 87 150075 168 49454 62 246830 115 159126 92 24"), [[15, 1, 87], [15, 3, 168]]);
        testing(closest("62608 83 256393 40 126987 136 83098 156 488148 172 27"), [[10, 5, 136], [10, 9, 172]]);
        testing(closest("212316 122 42364 102 69695 132 200158 45 48254 97 94"), [[16, 6, 200158], [16, 9, 97]]);
        testing(closest("104546 192 62615 139 359362 41 440709 198 326359 70 42"), [[20, 0, 104546], [20, 2, 62615]]);

        testing(closest("355291 116 410543 149 262413 34 489100 79 141718 66 44"), [[8, 1, 116], [8, 10, 44]]);
        testing(closest("54009 97 284836 72 215395 59 4466 130 89565 28 35"), [[8, 10, 35], [9, 3, 72]]);
        testing(closest("448232 113 120948 193 172526 151 448128 135 274117 126 36"), [[9, 7, 135], [9, 9, 126]]);
        testing(closest("347707 68 97500 171 409133 103 78140 4 25654 172 73"), [[4, 5, 103], [4, 7, 4]]);
        testing(closest("5047 185 413283 44 384112 111 324008 85 174065 164 83"), [[11, 9, 164], [11, 10, 83]]);

    })
})

describe("Random tests", function () {
    it("closest", function () {

    function randint(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    //................
    function doEx() {
        var i = 0;
        var res = "";
        while (i < 30) {
            if (i % 2 === 0) var n = randint(1, 500000); else n = randint(1, 200);
            res += +n + " ";
            i += 1;
        }
        return res + randint(1, 100);
    }
    function weight89(nb) {
        var n = 0, a = nb.split('');
        for (var i in a) { n += +a[i]; }
        return n;
    }
    function closest89(strng) {
        if (strng.length === 0) return [];
        var nums = strng.split(" "), l = [];
        for (let i = 0; i < nums.length; i++) {
            var n = nums[i], s = weight89(n);
            l.push([s, i, ~~n]);
        }
        var r = l.sort(function (x, y) {
            var cp = x[0] - y[0];
            if (cp === 0)
                return x[1] - y[1];
            if (cp < 0) return -1; else return 1;
        });
        var u = 1, mn = Number.MAX_SAFE_INTEGER, ndx = -1;
        while (u < r.length) {
            let a = r[u][0] - r[u - 1][0];
            if (a < mn) {
                mn = a;
                ndx = u;
            }
            u++;
        }
        return [r[ndx - 1], r[ndx]];
    }
    //.................
    console.log("****closest");

    function tests_code() {
        var i = 0;
        while (i < 200) {
            var r = doEx();
              // console.log(closest(r), closest89(r))
            testing(closest(r), closest89(r));
            i++;
        }
    }
    tests_code()
})
})