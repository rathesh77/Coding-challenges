function parseMolecule(formula) {

    return getSubFormula(formula, {}, [])
}

function getSubFormula(formula, parse) {
    console.log('brut formula:', formula)

    let i = 0
    let j = formula.length
    let subFormula = ''
    let beginBracketIndex = 0
    let endBracketIndex = 0

    while (i <= formula.length - 1 && formula[i] != '[' && formula[i] != '(' && formula[i] != '{') {
        subFormula += formula[i]
        i++
    }
    beginBracketIndex = i
    if (i == formula.length) {
        parseRawFormula(subFormula, parse)
        return parse
    }
    subFormula += formula[i]

    i++
    let cptBrackets = 1

    while (i <= formula.length - 1 && cptBrackets != 0) {
        if (formula[i] == '[' || formula[i] == '(' || formula[i] == '{')
            cptBrackets++
        if (formula[i] == ']' || formula[i] == ')' || formula[i] == '}')
            cptBrackets--

        subFormula += formula[i]
        i++
    }
    endBracketIndex = i
    if (beginBracketIndex != 0) {
        // left part
        //console.log('left:', subFormula.substring(0, beginBracketIndex))
        getSubFormula(subFormula.substring(0, beginBracketIndex), parse, 1)
    }

    getSubFormula(subFormula.substring(beginBracketIndex + 1, endBracketIndex - 1), parse, 1)
    //console.log('middle:', subFormula.substring(beginBracketIndex + 1, endBracketIndex - 1))

    let rightFormula = formula.substring(endBracketIndex)
    const mult = getMult(rightFormula)
    if (mult.begin != -1) {
        // right part
        getSubFormula(rightFormula.substring(mult['begin']), parse, 1)
        //console.log('right:', rightFormula.substring(mult['begin']))
    }


    return parse
}

function parseRawFormula(formula, parse) {

    //let parse = {}
    let i = 0
    let str = ''
    let num = ''
    //console.log(formula, parse)

    while (i != formula.length) {

        str += '' + formula[i]

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
        /*
                let temp = 0
               
                if ( parse[str] != null) {
                    temp = parse[str]
                }
                parse[str] = +num
                //console.log(parse[str], str, temp)
                for (let i = 0; i < mults.length; i++) {
        
                    parse[str] = (parse[str] * mults[i]) + temp
                    //console.log(parse[str], str)
        
                    temp = 0
                }*/



        parse[str] = +num * 1


        num = ''
        str = ''
    }
    return parse

}

function getMult(formula) {
    let mult = ''
    let begin = 0
    for (let i = 0; i < formula.length; i++) {
        if (!(formula[i] >= '0' && formula[i] <= '9')) {
            return { mult: mult == '' ? 1 : +mult, begin: i }
        }
        mult += formula[i]
    }
    return { mult: +mult, begin: -1 }

}




const water = 'H2O';
console.log(parseMolecule(water), `should equal ${JSON.stringify({ H: 2, O: 1 }, null, 2)}`)
const fremySalt = 'K4[ON(SO3)2]2';
console.log(parseMolecule(fremySalt), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)
const test = '(C5H5)Fe(CO)2';
console.log(parseMolecule(test), `should equal ${JSON.stringify({ 'C': 8, 'H': 8, 'Fe': 1, 'O': 2 }, null, 2)}`)
/*
const magnesiumHydroxide = 'Mg(OH)2';
console.log(parseMolecule(magnesiumHydroxide), `should equal ${JSON.stringify({ Mg: 1, O: 2, H: 2 }, null, 2)}`)


const weird  = 'As2{Be4C5[BCo3(CO2)3]2}4Cu5';
console.log(parseMolecule(weird), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)


*/