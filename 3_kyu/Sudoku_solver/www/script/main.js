let submitButton = document.getElementById('submit_sudoku')
let generateButton = document.getElementById('generate_random_board')
let viewSolutionButton = document.getElementById('view_solution')
let errorMessage = document.getElementById('error')
let board = generateRandomSudokuBoard()

fillBoard()

function checkInput(e) {
    if (e.value == '')
        return
    const lastValue = (e.value + '').split('').slice(-1)[0]
    if (!(lastValue < 10 && lastValue > 0) && lastValue != null) {
        e.value = 1
        return
    }
    e.value = lastValue
}


function fillBoard() {
    let i = 0, j = 0
    for (const col of Array.from(document.getElementsByTagName('td'))) {
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
    let valid = true
    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            if (!checkIfCellIsValid(board[row][col], row, col, board)) {
                valid = false
                break
            }
        }
    }
    errorMessage.style.display = 'block'

    if (!valid)
        errorMessage.innerText = 'Wrong'
    else
        errorMessage.innerText = 'Right'

}

function showSolution() {
    viewSolutionButton.disabled = 'disabled'
    fillBoard(sudoku(board))

}

function disableButton() {
    generateButton.disabled = true
    setTimeout(function () {
        generateButton.disabled = false
    }, 2000)
}

function generateRandomSudokuBoard() {
    disableButton()
    errorMessage.style.display = 'none'

    if (viewSolutionButton.attributes.getNamedItem('disabled'))
        viewSolutionButton.attributes.removeNamedItem('disabled')

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
            if (err instanceof RangeError)
                console.log(err)
        }
    }
    return puzzle
}