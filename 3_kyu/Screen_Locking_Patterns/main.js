class UndirectedGraph {
    constructor() {
        this.nodes = new Map()
    }
    addNode(dot) {
        const alreadyRegisteredNode = this.nodes.get(dot)
        if (alreadyRegisteredNode != null)
            return alreadyRegisteredNode

        const node = new _Node(dot)
        this.nodes.set(node.value, node)
        return node
    }
    connectNodes(n1, n2) {
        const src = this.nodes.get(n1)
        const dest = this.nodes.get(n2)
        if (src == null || dest == null)
            return

        src.addNext(dest)
        dest.addNext(src)
        return [src, dest]
    }
}

class _Node {
    constructor(value) {
        this.value = value
        this.previous = new Map()
        this.next = new Map()
    }
    addNext(node) {
        if (!node instanceof _Node)
            return
        this.next.set(node.value, node)
        node.previous.set(this.value, this)
        return node
    }
}

const g = new UndirectedGraph()
const dots = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (const dot of dots)
    g.addNode(dot)

g.connectNodes('A', 'B')
g.connectNodes('A', 'D')
g.connectNodes('A', 'E')
g.connectNodes('A', 'H')
g.connectNodes('A', 'F')

g.connectNodes('B', 'C')
g.connectNodes('B', 'D')
g.connectNodes('B', 'E')
g.connectNodes('B', 'F')
g.connectNodes('B', 'I')
g.connectNodes('B', 'G')

g.connectNodes('C', 'E')
g.connectNodes('C', 'F')
g.connectNodes('C', 'H')
g.connectNodes('C', 'D')

g.connectNodes('D', 'E')
g.connectNodes('D', 'G')
g.connectNodes('D', 'H')
g.connectNodes('D', 'I')

g.connectNodes('E', 'G')
g.connectNodes('E', 'H')
g.connectNodes('E', 'F')
g.connectNodes('E', 'I')

g.connectNodes('H', 'F')
g.connectNodes('H', 'I')
g.connectNodes('H', 'G')

g.connectNodes('I', 'F')

g.connectNodes('G', 'F')

function countPatternsFrom(firstPoint, length) {
    // Your code here
    if (length == 0)
        return 0

    let patterns = findPatterns(g, firstPoint, length - 1, {})
    return !Array.isArray(patterns) ? 1 : patterns.length
}

function findPatterns(g, startingPoint, length, alreadyUsedDots) {

    if (length == 0)
        return alreadyUsedDots

    alreadyUsedDots[startingPoint] = true
    let count = []
    for (const dot of g.nodes.get(startingPoint).next.keys()) {
        if (!alreadyUsedDots[dot]) {
            count = count.concat(findPatterns(g, dot, length - 1, { ...alreadyUsedDots }))
        } else {
            let patterns = null

            if (startingPoint == 'G') {
                if (dot == 'D' && !alreadyUsedDots['A'])
                    patterns = findPatterns(g, 'A', length - 1, { ...alreadyUsedDots })
                else if (dot == 'E' && !alreadyUsedDots['C'])
                    patterns = findPatterns(g, 'C', length - 1, { ...alreadyUsedDots })
                else if (dot == 'H' && !alreadyUsedDots['I'])
                    patterns = findPatterns(g, 'I', length - 1, { ...alreadyUsedDots })
            }
            else if (startingPoint == 'D' && dot == 'E' && !alreadyUsedDots['F'])
                patterns = findPatterns(g, 'F', length - 1, { ...alreadyUsedDots })

            else if (startingPoint == 'A') {
                if (dot == 'B' && !alreadyUsedDots['C'])
                    patterns = findPatterns(g, 'C', length - 1, { ...alreadyUsedDots })
                else if (dot == 'E' && !alreadyUsedDots['I'])
                    patterns = findPatterns(g, 'I', length - 1, { ...alreadyUsedDots })
                else if (dot == 'D' && !alreadyUsedDots['G'])
                    patterns = findPatterns(g, 'G', length - 1, { ...alreadyUsedDots })
            }
            else if (startingPoint == 'B' && dot == 'E' && !alreadyUsedDots['H'])
                patterns = findPatterns(g, 'H', length - 1, { ...alreadyUsedDots })
            else if (startingPoint == 'H' && dot == 'E' && !alreadyUsedDots['B'])
                patterns = findPatterns(g, 'B', length - 1, { ...alreadyUsedDots })

            else if (startingPoint == 'C') {
                if (dot == 'B' && !alreadyUsedDots['A'])
                    patterns = findPatterns(g, 'A', length - 1, { ...alreadyUsedDots })
                else if (dot == 'E' && !alreadyUsedDots['G'])
                    patterns = findPatterns(g, 'G', length - 1, { ...alreadyUsedDots })
                else if (dot == 'F' && !alreadyUsedDots['I'])
                    patterns = findPatterns(g, 'I', length - 1, { ...alreadyUsedDots })
            }
            else if (startingPoint == 'F' && dot == 'E' && !alreadyUsedDots['D'])
                patterns = findPatterns(g, 'D', length - 1, { ...alreadyUsedDots })

            else if (startingPoint == 'I') {
                if (dot == 'H' && !alreadyUsedDots['G'])
                    patterns = findPatterns(g, 'G', length - 1, { ...alreadyUsedDots })
                else if (dot == 'F' && !alreadyUsedDots['C'])
                    patterns = findPatterns(g, 'C', length - 1, { ...alreadyUsedDots })
                else if (dot == 'E' && !alreadyUsedDots['A'])
                    patterns = findPatterns(g, 'A', length - 1, { ...alreadyUsedDots })
            }
            if (patterns != null)
                count = count.concat(patterns)

        }

    }
    return count
}

module.exports = countPatternsFrom