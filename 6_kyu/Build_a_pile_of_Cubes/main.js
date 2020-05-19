function findNb(m) {

    var sum = 0, i = 1

    while (sum != m) {

        sum += Math.pow(i, 3)
        if (sum > m)
            return -1;
        i++
    }
    return (i - 1);
}
