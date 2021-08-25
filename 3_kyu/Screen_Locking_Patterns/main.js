class UndirectedGraph {
    constructor() {
        this.nodes = new Map()
    }
    addNode(dot) {
        const alreadyRegisteredNode = this.nodes.get(dot)
        if (alreadyRegisteredNode)
            return alreadyRegisteredNode

        const node = new Node(dot)
        this.nodes.set(node.value, node)
        return node
    }
    connectNodes(n1, n2) {
        const src = this.nodes.get(n1)
        const dest = this.nodes.get(n2)
        if (!src || !dest)
            return

        src.addNext(dest)
        dest.addNext(src)
        return [src, dest]
    }

    connectGroupsOfNodes(groups) {
        for (const group of groups)
            for (const target of group[1])
                this.connectNodes(group[0], target)
    }
}

class Node {
    constructor(value) {
        this.value = value
        this.previous = new Map()
        this.next = new Map()
    }
    addNext(node) {
        if (!node instanceof Node)
            return
        this.next.set(node.value, node)
        node.previous.set(this.value, this)
        return node
    }
}

const graph = new UndirectedGraph()
const dots = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const adjacentNodes = [
    ['A', ['B', 'D', 'E', 'H', 'F']],
    ['B', ['C', 'D', 'E', 'F', 'I', 'G']],
    ['C', ['E', 'F', 'H', 'D']],
    ['D', ['E', 'G', 'H', 'I']],
    ['E', ['G', 'H', 'F', 'I']],
    ['H', ['F', 'I', 'G']],
    ['F', ['I', 'G']],
]

for (const dot of dots)
    graph.addNode(dot)

graph.connectGroupsOfNodes(adjacentNodes)

function countPatternsFrom(firstPoint, length) {
    // Your code here
    if (length <= 0 || length > 9)
        return 0
    const patterns = findPatterns(firstPoint, length - 1, {})
    return !Array.isArray(patterns) ? 1 : patterns.length
}

function findPatterns(startingPoint, length, alreadyUsedDots) {
    if (length == 0)
        return alreadyUsedDots
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
    alreadyUsedDots[startingPoint] = true
    let count = []
    for (const dot of graph.nodes.get(startingPoint).next.keys()) {
        if (!alreadyUsedDots[dot]) {
            count = count.concat(findPatterns(dot, length - 1, { ...alreadyUsedDots }))
        } else {
            const pod = passingOverDots[startingPoint]
            if (pod && pod[dot] && !alreadyUsedDots[pod[dot]])
                count = count.concat(findPatterns(pod[dot], length - 1, { ...alreadyUsedDots }))
        }
    }
    return count
}

module.exports = countPatternsFrom