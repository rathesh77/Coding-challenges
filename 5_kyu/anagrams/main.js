function anagrams(word, words) {

    const finalArray = [];
    const sortedWord = word.split('').sort().join('')
    // we iterate through the array of words
    for (let i = 0; i < words.length; i++) {
        // we split each word to convert each of them to an array then we sort the array and compare with the splitted and sorted
        // word we have
        // eg : word  = 'ba' => ['b','a'] =>  ['a','d'] => 'ab'
        //      words[i] = 'da' => ['d','a'] =>  ['a','d'] => 'ad'
        // 'ab' == 'ad' ? we push word[i] to the final array : we skip
        if (words[i].split('').sort().join('') != sortedWord)
            continue;
        finalArray.push(words[i])
    }
    return finalArray;
}
console.log(anagrams('abba', ['abab', 'aabb', 'abbb', 'ab', 'a']))