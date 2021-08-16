function generateRandomSudokuBoard() {
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
function sudoku(puzzle) {
    let begin = Date.now()
    const filled = {}
    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            if (!filled[row])
                filled[row] = {}
            if (puzzle[row][col] == 0)
                filled[row][col] = false
            else
                filled[row][col] = true
        }
    }
    let row = 0, col = 0
    while (row != 9) {
        if (Date.now() - begin > 1500)
            throw new RangeError('Took too much time to resolve the generated sudoku')
        
        if (!filled[row][col]) {
            puzzle[row][col]++
            while (puzzle[row][col] < 10 && !checkIfCellIsValid(puzzle[row][col], row, col, puzzle))
                puzzle[row][col]++

            if (puzzle[row][col] == 10) {
                puzzle[row][col] = 0
                do {
                    col--
                    if (col < 0) {
                        row--
                        col = 8
                    }
                } while (filled[row][col])
                continue
            }
        }
        col++
        if (col == 9) {
            row++
            col = 0
        }

    }
    return puzzle
}

function checkIfCellIsValid(num, row, col, puzzle) {
    let i = 0
    for (; i < 9; i++)
        if (puzzle[row][i] == num && i != col)
            return false

    for (i = 0; i < 9; i++)
        if (puzzle[i][col] == num && i != row)
            return false

    const nthRow = Math.floor(row / 3)
    const endRow = (nthRow * 3) + 3
    const nthCol = Math.floor(col / 3)
    const endCol = (nthCol * 3) + 3

    for (let r = nthRow * 3; r < endRow; r++)
        for (let c = nthCol * 3; c < endCol; c++)
            if (r != row && c != col && puzzle[r][c] == num)
                return false

    return true
}

//module.exports = sudoku
