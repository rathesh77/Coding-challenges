function parseMolecule(formula) {

    return getSubFormula(formula, {}, {}, 1)
}

function getSubFormula(formula, parse, tree, init) {
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
        parseRawFormula(subFormula, parse,1)
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
        const left = subFormula.substring(0, beginBracketIndex)
        tree[left] = {}
        getSubFormula(left, parse, tree[left])
    }

    const mid = subFormula.substring(beginBracketIndex + 1, endBracketIndex - 1)
    tree[mid] = {}


    let rightFormula = formula.substring(endBracketIndex)
    const mult = getMult(rightFormula)

    tree[mid]['mult'] = mult['mult']
    getSubFormula(mid, parse, tree[mid])

    if (mult.begin != -1) {
        // right part
        const right = rightFormula.substring(mult['begin'])
        tree[right] = {}
        getSubFormula(right, parse, tree[right])
    }

    if (init == null)
        return

    console.log(JSON.stringify(tree,null,2))
    
    return parseJSON(formula, tree, {})
}

function parseJSON(key, tree, parse) {
    if (Object.keys(tree).length == 0) {
        parseRawFormula(key, parse, 1)
    }
    else if (Object.keys(tree).length == 1 && tree['mult'] != null) {
        parseRawFormula(key, parse, tree['mult'])

    }
    else {
        for (const key of Object.keys(tree)) {
            if (key != 'mult') {
                parseJSON(key, tree[key], parse)
            }
        }
        if (tree['mult'] != null) {
            for (const k of Object.keys(parse)) {
                if (key.indexOf(k) != -1 && !(key[key.indexOf(k)+1] >= 'a' && key[key.indexOf(k)+1] <= 'z') ) {
                    //console.log(k, key.indexOf(k) , key, tree['mult'], parse[k] )

                    parse[k] *= tree['mult']
                }
            }
        }
    }
    return parse
}

function parseRawFormula(formula, parse, mult) {

    //let parse = {}
    let i = 0
    let str = ''
    let num = ''

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

        parse[str] = (+num * mult) + (parse[str] == null ? 0 : 0)


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




/*
const fremySalt = 'K4[ON(SO3)2]2';
console.log(parseMolecule(fremySalt), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)


const water = 'H2O';
console.log(parseMolecule(water), `should equal ${JSON.stringify({ H: 2, O: 1 }, null, 2)}`)

const test = '(C5H5)Fe(CO)2';
console.log(parseMolecule(test), `should equal ${JSON.stringify({ 'C': 7, 'H': 5, 'Fe': 1, 'O': 2 }, null, 2)}`)

const magnesiumHydroxide = 'Mg(OH)2';
console.log(parseMolecule(magnesiumHydroxide), `should equal ${JSON.stringify({ Mg: 1, O: 2, H: 2 }, null, 2)}`)

*/
const weird  = 'As2{Be4C5[BCo3(CO2)3]2}4Cu5';
console.log(parseMolecule(weird), `should equal ${JSON.stringify({ K: 4, O: 14, N: 2, S: 4 }, null, 2)}`)


// j'ai besoin de different objets parse pour chaque sous noeuds d'un noeuds et additionner chaque molecules identiques