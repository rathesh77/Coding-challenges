let fatFingers = function (str) {
    if (str == null)
        return null
    let finalString = ''
    let caps = false
    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'a' || str[i] == 'A')
            caps = !caps
        else if (caps)
            if (str[i] >= 'b' && str[i] <= 'z')
                finalString += str[i].toUpperCase()
            else
                finalString += str[i].toLowerCase()
        else
            finalString += str[i]
    }
    return finalString
};