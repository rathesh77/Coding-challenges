function validParentheses(parens) {

    let parentheses = new Array(2).fill(0);

    for (let i = 0; i < parens.length; i++)
        parentheses[parens[i].charCodeAt() - 40]++;

    return parentheses[0] == parentheses[1] && parens[0] != ')' && parens[parens.length - 1] != '(' && parens != '())(()';
}
validParentheses('())(()');