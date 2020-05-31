
function chooseBestSum(t, k, ls) {
    // t somme maximum des distances, >= 0
    // k nombre de villes maximum >=0
    // ls tableau des distances 

    if ( ls.length == 1 && ls[0] < t)
        return null;

    let sum =0;
    let combinaisons = []
    var count = 1;
    for ( var i = 0 ; i < ls.length-2;i++)
    {
        sum+= ls[i]
    /*    sum += ls[i]
        console.log(ls[i])

        for ( var j = i+1 ; j < ls.length;j++)
        {
            sum+= ls[j]
            combinaisons.push(sum)
            console.log(ls[j])
            sum-= ls[j]
        }
//        if ( i >0)
        sum = ls[i-1]

        */
       for ( var j = i+1 ; j < ls.length;j++)
       {
           
           sum+= ls[j]
           let temp = sum
            let count = 2
           for ( var k = j+1 ; k < ls.length;k++)
           {
               count++
               sum+= ls[k]
               combinaisons.push(sum)
               console.log(sum)
            if ( count == k){
               sum=temp
               count = 0
            }
           }
           sum  = ls[i]     
       }
       sum = 0
    }
    console.log(combinaisons)
    combinaisons = combinaisons.filter((num)=> num <= t).sort()
    console.log(combinaisons)
    return parseInt(combinaisons.slice(-1))
}


console.log(chooseBestSum(163, 3, [50, 55, 56, 57, 58]), "should equal to "  +163)
console.log(chooseBestSum(163, 3,  [50]), "should equal to "  +null)    
console.log(chooseBestSum(230, 3, [91, 74, 73, 85, 73, 81, 87]),"should equal to "  + 228)
console.log(chooseBestSum(331, 4, [91, 74, 73, 85, 73, 81, 87]),"should equal to "  + 331)
