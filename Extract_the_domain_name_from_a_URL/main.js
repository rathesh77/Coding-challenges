function domainName(url) {

    if (url[0] != 'h' && url[0] != 'w')
        return url.substr(0, url.indexOf('.'));

    if (url.includes('http://') && !url.includes('http://www.'))
        url = url.substring(7, url.indexOf('.', 7));
    if (url.includes('https://') && !url.includes('https://www.'))
        url = url.substring(8, url.indexOf('.', 8));
    if (url.includes('www.') && !url.includes('http://www.') && !url.includes('https://www.'))
        url = url.substring(4, url.indexOf('.', 4));
    if (url.includes('http://www.'))
        url = url.substring(11, url.indexOf('.', 11));
    if (url.includes('https://www.'))
        url = url.substring(12, url.indexOf('.', 12));

    return url;
}
console.log(domainName('https://rathesh-io.herokuapp.com/'))