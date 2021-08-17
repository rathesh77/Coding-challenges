let submitButton = document.getElementById('submit_sudoku')
let generateButton = document.getElementById('generate_random_board')
let viewSolutionButton = document.getElementById('view_solution')
let errorMessage = document.getElementById('error')
let resetButton = document.getElementById('reset')
let board = generateRandomSudokuBoard()

constructDOM()
fillBoard()

function checkInput(e) {
    if (this.value == '')
        return
    const lastValue = +e.data
    if (!(lastValue < 10 && lastValue > 0)) {
        e.target.value = 1
        return
    }
    e.target.value = lastValue
}

function constructDOM() {
    const table = document.createElement('table')
    for (let i = 0; i < 9; i++) {
        const tr = document.createElement('tr')
        for (let j = 0; j < 9; j++) {
            const td = document.createElement('td')
            const input = document.createElement('input')
            input.type = 'text'
            input.className = 'sudoku_cell'
            input.addEventListener('input', checkInput)
            td.appendChild(input)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    document.body.prepend(table)
}

function fillBoard() {
    let i = 0, j = 0
    for (const col of Array.from(document.getElementsByTagName('td'))) {
        document.getElementsByTagName('tr')[i].children[j].children[0].style.color = 'black'
        if (board[i][j] == 0) {
            board[i][j] == ''
            col.children[0].value = ''
            if (col.children[0].attributes.getNamedItem('disabled'))
                col.children[0].attributes.removeNamedItem('disabled')
        } else {
            col.children[0].disabled = 'disabled'
            col.children[0].value = board[i][j]
        }
        j++
        if (j == 9) {
            i++
            j = 0
        }
    }
}

function isBoardValid() {
    const puzzle = [[], [], [], [], [], [], [], [], []]
    let i = 0
    for (const row of Array.from(document.getElementsByTagName('tr'))) {
        for (const col of Array.from(row.children)) {
            let cellValue = col.children[0].value
            if (cellValue === '')
                cellValue = 0
            puzzle[i].push(+cellValue)
        }
        i++
    }
    let mistakes = []
    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            const isValid = checkIfCellIsValid(puzzle[row][col], row, col, puzzle)
            if (!isValid) {
                mistakes.push({ row, col })
                if (puzzle[row][col] != board[row][col])
                    document.getElementsByTagName('tr')[row].children[col].children[0].style.color = 'red'

            } else {
                document.getElementsByTagName('tr')[row].children[col].children[0].style.color = 'black'
            }
        }
    }

    errorMessage.style.display = 'block'
    if (mistakes.length != 0)
        errorMessage.innerText = 'Invalid board'
    else
        errorMessage.innerText = 'Valid board'
    return mistakes
}

function showSolution() {
    viewSolutionButton.disabled = 'disabled'
    resetButton.disabled = 'disabled'
    board = sudoku(board)
    fillBoard()

}

function generateRandomSudokuBoard() {
    errorMessage.style.display = 'none'

    if (viewSolutionButton.attributes.getNamedItem('disabled'))
        viewSolutionButton.attributes.removeNamedItem('disabled')
    if (resetButton.attributes.getNamedItem('disabled'))
        resetButton.attributes.removeNamedItem('disabled')
    let puzzle = null
    while (1) {
        puzzle = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let shouldFillCell = Math.random()
                if (shouldFillCell > 0.3) {
                    puzzle[row][col] = 0
                } else {
                    let cellValue = 1
                    do {
                        cellValue = Math.floor(Math.random() * 10)
                    } while (!checkIfCellIsValid(cellValue, row, col, puzzle))
                    puzzle[row][col] = cellValue
                }
            }
        }
        try {
            const newArray = puzzle.map(function (arr) {
                return arr.slice(0);
            })
            sudoku(puzzle)
            return newArray

        } catch (err) {
            if (err instanceof WrongPuzzle)
                console.log(err)
        }
    }
    return puzzle
}