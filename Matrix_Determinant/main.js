function determinant(m) {
    if (m[0].length == 1)
        return parseInt(m[0])

    if (m[0].length == 2)
        return squaredMatrixDeterminant(m);

    iterateMatrix(m, m[0][0]);

    var finalResult = valeurs.reduce((acc, currentVal) => acc + currentVal);
    if (m.length <= 3 || m.length >= 5)
        finalResult /= m[0][0];

    valeurs = [];
    return finalResult;
};
function squaredMatrixDeterminant(m) {
    return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
}
var valeurs = []
function iterateMatrix(m, val) {
    if (m.length < 2)
        return;
    if (m.length == 2) {
        valeurs.push(val * squaredMatrixDeterminant(m));
        return;
    }
    for (var i = 0; i < m[0].length; i++) {
        if (i % 2 == 0)
            iterateMatrix(getMat(1, i, m), val * m[0][i]);
        else
            iterateMatrix(getMat(1, i, m), -1 * val * m[0][i]);
    }
}

function getMat(i, ignore, m) {
    var matrix = [];
    for (var k = i; k < m.length; k++) {
        matrix.push([]);
        for (var l = 0; l < m[k].length; l++) {
            if (l != ignore)
                matrix[matrix.length - 1].push(m[k][l]);
        }
    }
    return matrix;
}
console.log(determinant([ [60, 158, 178], [48, -28, -5], [-2, -88, 47] ]))

