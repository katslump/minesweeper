let board = [];
const numRows = 10;
const numCols = 10;

function makeBoard() {
    board = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        board[i] = new Array(numCols);
    }
}

function fillBoard() {
    let count = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            board[i][j] = '-';
            $("#grid").append('<a href="#" id=' + count + ' class="btn btn-sq-xs btn-primary" onclick="handleEvent(' + count + ',' + i + ',' + j + ')"></a>');
            count++;
        }
        $("#grid").append('<br/>');
    }
}

function handleEvent(count, row, col) {
    let element = document.getElementById(count);

    if (checkForMine(count, row, col)) {
        element.className = "btn btn-sq-xs btn-danger";
    } else {
        let mineCount = getMineCount(count, row, col);
        if (mineCount !== 0) {
            element.textContent = mineCount.toString();
        }
        element.className = "btn btn-sq-xs btn-success";
    }
}

function placeMines(numOfMines) {
    let randomRow = 0;
    let randomCol = 0;
    for (let i = 0; i < numOfMines; i++) {
        randomRow = Math.floor(Math.random() * numRows);
        randomCol = Math.floor(Math.random() * numCols);

        while (board[randomRow][randomCol] === '*') {
            randomRow = Math.floor(Math.random() * numRows);
            randomCol = Math.floor(Math.random() * numCols);
        }
        console.log("Mine will be at row: " + randomRow + " col: " + randomCol);
        board[randomRow][randomCol] = '*';
    }

}

function checkForMine(count, x, y) {
    if (board[x][y] === '*') {
        return true;
    } else {
        return false;
    }
}

function getMineCount(count, x, y) {
    return checkRow(count, x, y) + checkCol(count, x, y) + checkDiagonals(count, x, y);
}

function checkRow(count, x, y) {
    let mineCount = 0;

    if (x - 1 >= 0) {
        if (board[x - 1][y] === '*') {
            mineCount++;
        }
    }

    if (x + 1 < numRows) {
        if (board[x + 1][y] === '*') {
            mineCount++;
        }
    }

    return mineCount;
}

function checkCol(count, x, y) {
    let mineCount = 0;

    if (y - 1 >= 0) {
        if (board[x][y + 1] === "*") {
            mineCount++;
        }
    }

    if (y + 1 < numCols) {
        if (board[x][y - 1] === "*") {
            mineCount++;
        }
    }

    return mineCount;
}

function checkDiagonals(count, x, y) {
    let mineCount = 0;
    if (x + 1 <= numRows - 1 && y + 1 < numCols) {
        if (board[x + 1][y + 1] === "*") {
            mineCount++;
        }
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
        if (board[x - 1][y - 1] === "*") {
            mineCount++;
        }
    }
    if (y + 1 <= numCols - 1 && x - 1 >= 0) {
        if (board[x - 1][y + 1] === "*") {
            mineCount++;
        }
    }
    if (x + 1 <= numRows - 1 && y - 1 >= 0) {
        if (board[x + 1][y - 1] === "*") {
            mineCount++;
        }
    }
    return mineCount;
}

function init() {
    makeBoard();
    fillBoard();
    placeMines(10);
}

$(document).ready(function() {
    init();

});
