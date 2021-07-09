var generateColor = function () {
    let str = ''
    for (let i = 0; i < 6; i++)
        str += Math.floor(Math.random() * 16).toString(16)

    return '#' + str
}