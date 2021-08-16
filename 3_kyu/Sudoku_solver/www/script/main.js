let board = generateRandomSudokuBoard()
fillBoard(board)

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


function fillBoard(board) {
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

function isBoardValid(board) {
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
    const solution = sudoku(board)
    document.getElementById('error').style.display = 'block'

    if (JSON.stringify(puzzle) !== JSON.stringify(solution)) {
        document.getElementById('error').innerText = 'Wrong'
        fillBoard(solution)
    } else {
        document.getElementById('error').innerText = 'Right'
    }
}
function disableButton() {
    let button = document.getElementById('generate_random_board')
    button.disabled = true
    setTimeout(function () {
        button.disabled = false
    }, 5000)
}
