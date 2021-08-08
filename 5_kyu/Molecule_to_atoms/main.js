const parseMolecule = formula => getSubFormula(formula, {}, {}, 1)

const getSubFormula = (formula, parse, tree, init) => {
    let i = 0
    let formulaLen = formula.length
    let beginBracketIndex = formula.match(/\(|\[|\{/)
    let cptBrackets = 1

    if (beginBracketIndex == null)
        return parseRawFormula(formula, 1)

    beginBracketIndex = beginBracketIndex.index
    let subFormula = formula.substring(0, beginBracketIndex + 1)

    i = beginBracketIndex + 1

    while (i <= formulaLen - 1 && cptBrackets != 0) {
        if (formula[i] == '[' || formula[i] == '(' || formula[i] == '{')
            cptBrackets++
        if (formula[i] == ']' || formula[i] == ')' || formula[i] == '}')
            cptBrackets--

        subFormula += formula[i]
        i++
    }
    let endBracketIndex = i
    if (beginBracketIndex != 0) {
        const left = subFormula.substring(0, beginBracketIndex)
        tree[left] = {}
        getSubFormula(left, parse, tree[left])
    }

    const right = subFormula.substring(beginBracketIndex + 1, endBracketIndex - 1)

    const remainingFormulas = formula.substring(endBracketIndex)
    const index = getIndexAfterBraces(remainingFormulas)

    tree[right] = { index: index['index'] }
    getSubFormula(right, parse, tree[right])

    if (index.begin != -1) {
        const remainings = remainingFormulas.substring(index['begin'])
        tree[remainings] = {}
        getSubFormula(remainings, parse, tree[remainings])
    }

    return init == null ? 0 : parseJSON(formula, tree)
}

const parseJSON = (key, tree) => {
    let parses = []
    const index = tree['index']
    const subFormulas = Object.keys(tree)
    const subFormulasLen = subFormulas.length
    if (subFormulasLen == 0)
        return parseRawFormula(key, 1)
    if (subFormulasLen == 1 && index != null)
        return parseRawFormula(key, index)
    for (const formula of subFormulas)
        if (formula != 'index')
            parses.push({ ...parseJSON(formula, tree[formula]) })

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
    formula.match(/[A-Z]{1}[a-z]*[0-9]*/g).forEach(molecule => {
        molecule = molecule.match(/([A-Z]{1}[a-z]*)|[0-9]+/g)
        const atom = molecule[0]
        const indexAfterBraces = molecule[1] == null ? 1 : molecule[1]
        if (parse[atom] == null)
            parse[atom] = (+indexAfterBraces * index)
        else
            parse[atom] = ((+indexAfterBraces * index)) + parse[atom]
    })

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
    return { index: index == '' ? 1 : +index, begin: -1 }
}

module.exports = parseMolecule