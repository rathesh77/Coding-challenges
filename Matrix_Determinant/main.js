function determinant(m) {

    console.table(m)
    if (m[0].length == 2) {
        /*  console.log(m[0][0] )
          console.log(m[1][1] )
  
          console.log(m[0][1] )
          console.log(m[1][0] )
  */
        return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
    }
    else if (m[0].length == 1) {
        return parseInt(m[0])
    }
    else {
        var det = 0
        for (var i = 0; i < m[0].length; i++) {
            var sign = -1
            if (i % 2 == 0) {
                sign = 1
            }
            if ( m[0].length> 3 ){
           var subMatrix =  getMat(1,1,m)
           console.table(subMatrix)
            }
          //  return ''
            if (i - 1 < 0) {
                det += (m[0][i] * sign) * (squaredMatrixDeterminant(m[1][1], m[2][2], m[1][2], m[i + 2][1]))

            }
            else if (i + 1 == m[0].length) {
                det += (m[0][i] * sign) * (squaredMatrixDeterminant(m[1][0], m[2][1], m[1][1], m[2][0]))
            }
            else {

                det += (m[0][i] * sign) * (squaredMatrixDeterminant(m[1][0], m[2][2], m[1][2], m[2][0]))

            }



        }
        return det

    }

};
function squaredMatrixDeterminant(a, d, b, c) {

    return (a * d) - (b * c);
}

function getMat(i,j,m){
    //console.log(m[i][j])
    
    var matrix = []
    for ( var k = i ; k < m.length;k++)
    {
        matrix.push([])
        //console.log(m[k])
        for ( var l = j ; l < m[k].length;l++)
        {
            matrix[matrix.length-1].push(m[k][l])
          //  console.log(m[k][l])
        }
    }
  //  console.table(matrix)
    //console.log('*-------*')
    return matrix
}





console.log(determinant([[10, 2, 3], [5, 0, 1], [2, 3, 6]]))

