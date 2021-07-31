function parseMolecule(formula) {
    // do your science here



    return rec(formula, {}, 1, 1, false)
}

function rec(formula, parse, mult, globalMult) {

    let i = 0, j = formula.length - 1
    let str = ''
    while (formula[i] != '{' && formula[i] != '(' && formula[i] != '[' && formula[i] != '}' && formula[i] != ')' && formula[i] != ']' && i <= formula.length - 1) {
        str += formula[i]
        i++
    }
    console.log('folj', formula)
    parse = parseWithoutBrackets(str, { ...parse }, mult, globalMult, formula.indexOf('(') == -1 && formula.indexOf('[') == -1 ? true : false)
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
    const subFormula = formula.substring(i + 1, j)

    
    if (formula[j] == ']') {
        console.log('t',num)
        parse = rec(subFormula, parse, mult, parseInt(num)* globalMult)
    }
    else
        parse = rec(subFormula, parse, parseInt(num),globalMult)


    return parse
}

function parseWithoutBrackets(formula, parse, mult, globalMult, applyGlobalMult) {
    let i = 0
    let str = ''
    let num = ''
    console.log(formula, parse, globalMult, applyGlobalMult)

    while (i != formula.length) {

        str += '' + formula[i]
        //console.log(formula[i], mult, globalMult)

        i++

        while (formula[i] >= 'a' && formula[i] <= 'z') {
            str += '' + formula[i]
            i++
        }
        while (formula[i] >= '0' && formula[i] <= '9') {
            num += '' + formula[i]
            i++
        }
        if (num.length == 0)
            num = 1

        if (parse[str] != null) {
            console.log('parse',parse[str])
            parse[str] = (((+num) * mult) + parse[str])*(applyGlobalMult == true ? globalMult : 1)
        }
        else
            parse[str] = (+num * mult)**(applyGlobalMult == true ? globalMult : 1)
      

        //i++
        num = ''
        str = ''
    }
    return parse
}

const water = 'H2O';
console.log(parseMolecule(water), `should equal ${JSON.stringify({ H: 2, O: 1 }, null, 2)}`)

const magnesiumHydroxide = 'Mg(OH)2';
console.log(parseMolecule(magnesiumHydroxide), `should equal ${JSON.stringify({ Mg: 1, O: 2, H: 2 }, null, 2)}`)

const fremySalt = 'K4[ON(SO3)2]2';
console.log(parseMolecule(fremySalt), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)
