function sudoku(puzzle) {
    let filled = {}
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
        if (!filled[row][col]) {
            puzzle[row][col]++
            while (!checkRow(puzzle[row][col], row, col, puzzle) ||
                !checkCol(puzzle[row][col], row, col, puzzle) ||
                !checkBox(puzzle[row][col], row, col, puzzle) && puzzle[row][col] < 10)
                puzzle[row][col]++

            if (puzzle[row][col] == 10) {
                puzzle[row][col] = 0
                col--
                if (col < 0) {
                    row--
                    col = 8
                }
                while (filled[row][col]) {
                    col--
                    if (col < 0) {
                        row--
                        col = 8
                    }
                }
            } else {
                col++
                if (col == 9) {
                    row++
                    col = 0
                }
            }
        } else {
            col++
            if (col == 9) {
                row++
                col = 0
            }
        }
    }
    return puzzle
}

function checkRow(num, row, col, puzzle) {
    for (let j = 0; j < 9; j++) {
        if (j == col)
            continue
        if (puzzle[row][j] == num)
            return false
    }
    return true
}

function checkCol(num, row, col, puzzle) {
    for (let i = 0; i < 9; i++) {
        if (i == row)
            continue
        if (puzzle[i][col] == num)
            return false
    }
    return true
}

function checkBox(num, row, col, puzzle) {
    let nthRow = Math.floor(row / 3)
    let endRow = (nthRow * 3) + 3
    let nthCol = Math.floor(col / 3)
    let endCol = (nthCol * 3) + 3

    for (let r = nthRow * 3; r < endRow; r++) {
        for (let c = nthCol * 3; c < endCol; c++) {
            if (r == row && c == col)
                continue
            if (puzzle[r][c] == num)
                return false
        }
    }
    return true
}

let puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];

let solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]];


console.table(sudoku(puzzle))
/* should return [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
]; */

module.exports = sudoku
