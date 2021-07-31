function parseMolecule(formula) {
    // do your science here
    let parse = {}

    let i = 0, j = formula.length - 1
    let str = ''
    while (formula[i] != '{' && formula[i] != '(' && formula[i] != '[' && formula[i] != '}' && formula[i] != ')' && formula[i] != ']' && i <= formula.length - 1) {
        str += formula[i]
        i++
    }

    parse = parseWithoutBrackets(str, {}, 1)
    if (i == formula.length) {
        return parse
    }
    let num = ''
    while (formula[j] != '}' && formula[j] != ')' && formula[j] != ']' && j > 0) {
        num = formula[j] + num
        j--
    }
    parse = rec(formula.substring(i + 1, j), parse, parseInt(num))


    return parse
}

function rec(formula, parse, mult) {

    let i = 0, j = formula.length - 1
    let str = ''
    while (formula[i] != '{' && formula[i] != '(' && formula[i] != '[' && formula[i] != '}' && formula[i] != ')' && formula[i] != ']' && i <= formula.length - 1) {
        str += formula[i]
        i++
    }

    parse = parseWithoutBrackets(str, { ...parse }, mult)
    for (const key of Object.keys(parse)) {
        //parse[key] *= mult
    }
    if (i == formula.length) {
        return parse
    }
    let num = ''
    while (formula[j] != '}' && formula[j] != ')' && formula[j] != ']' && j > 0) {
        num = formula[j] + num
        j--
    }
    parse = rec(formula.substring(i + 1, j), parse, parseInt(num))


    return parse
}

function parseWithoutBrackets(formula, parse, mult) {
    let letters = formula.match(/[A-Z]{1,1}[a-z]*/g)
    let numbers = formula.match(/[0-9]+/g)
    console.log(formula,letters, numbers)
    if (numbers == null) {
        for (let i = 0; i < letters.length; i++) {
            if ( parse[letters[i]] == null)
            parse[letters[i]] = 1
            parse[letters[i]] *=  mult
        }
    }
    else {
        for (let i = 0; i < letters.length; i++) {
            console.log(letters[i],parse[letters[i]])
            parse[letters[i]] = numbers[i] == null ? 1 * mult : +numbers[i] * mult
        }
    }
    //console.log(formula,parse)

    return parse
}

const water = 'H2O';
console.log(parseMolecule(water), `should equal ${JSON.stringify({ H: 2, O: 1 }, null, 2)}`)

const magnesiumHydroxide = 'Mg(OH)2';
console.log(parseMolecule(magnesiumHydroxide), `should equal ${JSON.stringify({ Mg: 1, O: 2, H: 2 }, null, 2)}`)

const fremySalt = 'K4[ON(S3O)2]2';
console.log(parseMolecule(fremySalt), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)
