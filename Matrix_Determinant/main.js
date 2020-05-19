var valeurs = [];

function determinant(m) {
    console.table(m);

    if (m[0].length == 1)
        return parseInt(m[0])

    if (m[0].length == 2)
        return squaredMatrixDeterminant(m);

    iterateMatrix(m);

    var det = valeurs.reduce((acc, currentVal) => acc + currentVal);

    valeurs = [];

    return det;
};

function squaredMatrixDeterminant(m, val) {
    if (m[0].length == 2) {
        if (val == undefined)
            return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);

        return val * ((m[0][0] * m[1][1]) - (m[0][1] * m[1][0]));
    }
    for (var i = 1; i < m[0].length; i++) {
        if (i % 2 == 0)
            valeurs.push(squaredMatrixDeterminant(getMatrix(1, i, m), val * m[0][i]))
        else
            valeurs.push(squaredMatrixDeterminant(getMatrix(1, i, m), -1 * val * m[0][i]))
    }
    return squaredMatrixDeterminant(getMatrix(1, 0, m), val * m[0][0])
}

function iterateMatrix(m) {
    for (var i = 0; i < m[0].length; i++) {
        if (i % 2 == 0)
            valeurs.push(squaredMatrixDeterminant(getMatrix(1, i, m), m[0][i]))
        else
            valeurs.push(squaredMatrixDeterminant(getMatrix(1, i, m), -1 * m[0][i]))
    }
}

function getMatrix(i, ignore, m) {
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
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - (min)) + (min));
}

const currentTime = new Date().getTime();

var matrice = []
const dimension = getRandomNumberBetween(2, 6)
for (var i = 0; i < dimension; i++) {
    matrice.push([]);
    for (var j = 0; j < dimension; j++)
        matrice[matrice.length - 1].push(getRandomNumberBetween(-100, 100));
}

console.log(determinant(matrice));
console.log("\nTemps d'execution: " + (new Date().getTime() - currentTime) / 1000 + " secondes");