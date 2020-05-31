function calculateString(st) {
    
    let str = '';

    for (let i = 0; i < st.length; i++) 
        if (isNumber(st[i]) || isOperator(st[i])) 
            str += st[i];

    if (str.indexOf('+') != -1) {
        str = str.split('+');
        return roundIt(parseFloat(str[0]) + parseFloat(str[1]) + ''.toString()) + '';
    }

    if (str.indexOf('*') != -1) {
        str = str.split('*');
        return roundIt(parseFloat(str[0]) * parseFloat(str[1]) + ''.toString()) + '';
    }

    if (str.indexOf('-') != -1) {
        str = str.split('-');
        return roundIt(parseFloat(str[0]) - parseFloat(str[1]) + ''.toString()) + '';
    }
    if (str.indexOf('/') != -1) {
        str = str.split('/');
        return roundIt(parseFloat(str[0]) / parseFloat(str[1]) + ''.toString()) + '';
    }
}

function isNumber(c) {

    return (c >= '0' && c <= '9') || c == '.';
}
function isOperator(c) {

    return c == '+' || c == '/' || c == '-' || c == '*';
}
function roundIt(n) {
    if (n.indexOf('.') != -1) 
        return Math.round(n);
    return n;
}
console.log(calculateString("fsdfsd234.4554s4234df+sf234442"), "234676");
console.log(calculateString("sdfsd23454sdf*2342"), "54929268");
console.log(calculateString("fsdfsd235???34.4554s4234df-sdfgf2g3h4j442"), "-210908");
console.log(calculateString("fsdfsd234.4554s4234df+sf234442"), "234676");
console.log(calculateString("50348p4wl.st57boe3+191r52yc64.0d7se9k"), '2418749');