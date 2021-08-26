function countPatternsFrom(firstPoint, length) {
    if (length < 1 || length > 9)
        return 0
    const patterns = findPatterns(firstPoint, length - 1, {})
    return !Array.isArray(patterns) ? 1 : patterns.length
}

function findPatterns(start, length, alreadyUsedDots) {
    if (length == 0)
        return alreadyUsedDots
    const paths = {
        'A': ['B', 'D', 'E', 'H', 'F'],
        'B': ['A', 'C', 'E', 'D', 'F', 'I', 'G'],
        'C': ['B', 'E', 'F', 'H', 'D'],
        'D': ['A', 'B', 'E', 'C', 'G', 'H', 'I'],
        'E': ['B', 'A', 'C', 'D', 'F', 'G', 'H', 'I'],
        'F': ['C', 'B', 'A', 'E', 'G', 'H', 'I'],
        'G': ['D', 'H', 'B', 'F', 'E'],
        'H': ['G', 'I', 'D', 'E', 'F', 'A', 'C'],
        'I': ['E', 'H', 'F', 'B', 'D'],
    }
    const passingOverDots = {
        'G': { 'D': 'A', 'E': 'C', 'H': 'I' },
        'D': { 'E': 'F' },
        'A': { 'B': 'C', 'E': 'I', 'D': 'G' },
        'B': { 'E': 'H' },
        'H': { 'E': 'B' },
        'C': { 'B': 'A', 'E': 'G', 'F': 'I' },
        'F': { 'E': 'D' },
        'I': { 'H': 'G', 'F': 'C', 'E': 'A' }
    }
    alreadyUsedDots[start] = true
    let count = []
    for (const dot of paths[start]) {
        if (!alreadyUsedDots[dot]) {
            count = count.concat(findPatterns(dot, length - 1, { ...alreadyUsedDots }))
        } else {
            const pod = passingOverDots[start]
            if (pod && pod[dot] && !alreadyUsedDots[pod[dot]])
                count = count.concat(findPatterns(pod[dot], length - 1, { ...alreadyUsedDots }))
        }
    }
    return count
}

module.exports = countPatternsFrom