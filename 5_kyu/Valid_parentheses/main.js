function validParentheses(parens) {
    let count = 0
    for (let i = 0; i < parens.length; i++) {
        if (parens[i] === '(')
            count++
        else if (parens[i] === ')')
            count--
        if (count === -1)
            break
    }
    return count === 0
}

validParentheses('())(()');