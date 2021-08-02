const parseMolecule = formula => getSubFormula(formula, {}, {}, 1)

const getSubFormula = (formula, parse, tree, init) => {
    let i = 0
    let formulaLen = formula.length
    let subFormula = ''
    let beginBracketIndex = 0
    let endBracketIndex = 0

    while (i <= formulaLen - 1 && formula[i] != '[' && formula[i] != '(' && formula[i] != '{') {
        subFormula += formula[i]
        i++
    }
    beginBracketIndex = i
    if (i == formulaLen)
        return parseRawFormula(subFormula, 1)

    subFormula += formula[i]

    i++
    let cptBrackets = 1

    while (i <= formulaLen - 1 && cptBrackets != 0) {
        if (formula[i] == '[' || formula[i] == '(' || formula[i] == '{')
            cptBrackets++
        if (formula[i] == ']' || formula[i] == ')' || formula[i] == '}')
            cptBrackets--

        subFormula += formula[i]
        i++
    }
    endBracketIndex = i
    if (beginBracketIndex != 0) {
        const left = subFormula.substring(0, beginBracketIndex)
        tree[left] = {}
        getSubFormula(left, parse, tree[left])
    }

    const right = subFormula.substring(beginBracketIndex + 1, endBracketIndex - 1)
    tree[right] = {}

    const remainingFormulas = formula.substring(endBracketIndex)
    const index = getIndexAfterBraces(remainingFormulas)

    tree[right]['index'] = index['index']
    getSubFormula(right, parse, tree[right])

    if (index.begin != -1) {
        const remainings = remainingFormulas.substring(index['begin'])
        tree[remainings] = {}
        getSubFormula(remainings, parse, tree[remainings])
    }

    if (init == null)
        return

    return parseJSON(formula, tree, {})
}

const parseJSON = (key, tree, parse) => {
    let parses = []
    const index = tree['index']
    const subFormulas = Object.keys(tree)
    const subFormulasLen = subFormulas.length
    if (subFormulasLen == 0) {
        return parseRawFormula(key, 1)
    }
    else if (subFormulasLen == 1 && index != null) {
        return parseRawFormula(key, index)
    }
    for (const formula of subFormulas)
        if (formula != 'index')
            parses.push({ ...parseJSON(formula, tree[formula], parse) })

    const newParse = {}
    for (let i = 0; i < parses.length; i++)
        for (const k of Object.keys(parses[i]))
            if (newParse[k] == null)
                newParse[k] = parses[i][k]
            else
                newParse[k] += parses[i][k]

    if (index != null)
        for (const k of Object.keys(newParse))
            newParse[k] *= index

    return newParse

}

const parseRawFormula = (formula, index) => {

    const parse = {}
    let i = 0
    let atom = ''
    let indexAfterBraces = ''

    while (i != formula.length) {

        atom += '' + formula[i]
        i++
        while (formula[i] >= 'a' && formula[i] <= 'z') {
            atom += '' + formula[i]
            i++
        }
        while (formula[i] >= '0' && formula[i] <= '9') {
            indexAfterBraces += '' + formula[i]
            i++
        }
        if (indexAfterBraces.length == 0)
            indexAfterBraces = 1

        if (parse[atom] == null)
            parse[atom] = (+indexAfterBraces * index)
        else
            parse[atom] = ((+indexAfterBraces * index)) + parse[atom]

        indexAfterBraces = ''
        atom = ''
    }
    return parse
}

const getIndexAfterBraces = formula => {
    let index = ''
    for (let i = 0; i < formula.length; i++) {
        if (!(formula[i] >= '0' && formula[i] <= '9')) {
            return { index: index == '' ? 1 : +index, begin: i }
        }
        index += formula[i]
    }
    return { index: +index, begin: -1 }
}

module.exports = parseMolecule