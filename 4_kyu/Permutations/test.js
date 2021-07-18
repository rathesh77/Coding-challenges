
const permutations = require('./main')
const chai = require('chai')
const expect = chai.expect

describe('permutations', function () {
    it('unique letters', function () {
        expect(permutations('a')).deep.to.equal(['a']);
        expect(permutations('ab').sort()).deep.to.equal(['ab', 'ba'].sort());
        expect(permutations('abc').sort()).deep.to.equal(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'].sort());
        const abcd = [
            'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'bacd', 'badc', 'bcad', 'bcda', 'bdac', 'bdca',
            'cabd', 'cadb', 'cbad', 'cbda', 'cdab', 'cdba', 'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba'
        ];
        expect(permutations('abcd').sort()).deep.to.equal(abcd.sort());
        expect(permutations('bcad').sort()).deep.to.equal(abcd.sort());
        expect(permutations('dcba').sort()).deep.to.equal(abcd.sort());
    });

    it('duplicate letters', function () {
        expect(permutations('aa').sort()).deep.to.equal(['aa'].sort());
        expect(permutations('aabb').sort()).deep.to.equal(['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa'].sort());
        expect(permutations('aaaab').sort()).deep.to.equal(['aaaab', 'aaaba', 'aabaa', 'abaaa', 'baaaa'].sort());
    });
});