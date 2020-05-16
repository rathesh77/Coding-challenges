function chooseBestSum(t, k, ls) {

    var combinaisons = []
    var pos = 0
    var count = 0
    console.log(t)
    console.log(k)
    console.log(ls)
    console.log('-----------------------------')

    for ( var i = 0 ; i <ls.length;i++){

        var sum = ls[i]
        for ( var j = 0 ; j < ls.length;j++)
        {
            if ( i == j)
            continue
            if ( (count+1) % k == 0 )
            {
                combinaisons.push(sum)
                sum = ls[i]
                count = 0
                continue
            }
            sum += ls[j]

            count++
        }
    }
    var bestSum = combinaisons.filter(element=>element<=t).sort(function(a,b){return b-a})
    if ( bestSum == undefined)
    return null
    return(bestSum)
}

console.log(chooseBestSum(163,3,[50, 55, 56, 57, 58])) // => 228