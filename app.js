let board = [];
const numRows = 3;
const numCols = 3;

function Player(name, turn) {
    this.name = name;
    this.turn = turn;
}

function Board(width, height, grid) {
    this.width = width;
    this.height = height;
    this.grid = [];
}

function Mine(x, y, active) {
    this.x = x;
    this.y = y;
    this.active = active;
}

function Field(x, y, revealed) {
    this.x = x;
    this.y = y;
    this.revealed = revealed;
}

function makeBoard() {
    board = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        board[i] = new Array(numCols);
    }
}

function fillBoard() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            board[i][j] = '-';
        }
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
    checkForMine(Math.floor(Math.random() * numRows),Math.floor(Math.random() * numCols));

}

function checkForMine(x, y) {
    console.log("Checking for a mine at: " + x + ', ' + y);
    if (board[x][y] === '*') {
        console.log("MINE FOUND AT: " + x + " " + y);
    } else if (checkRow(x, y) || checkCol(x, y) || checkDiagonals(x, y)) {
        console.log("MINE FOUND AT: " + x + " " + y);
    } else {
        console.log("NO // MINE FOUND AT: " + x + " " + y);
    }
}

function checkRow(x, y) {

    if(x-1 >= 0 && x + 1 < numRows) {
        // Check right
        if (board[x + 1][y] === '*') {
            return true;
            // Check left
        } else if (0 && board[x - 1][y] === '*' ) {
            return true;
            // Not found via row
        } else {
            return false;
        }
    } else {
        return false;
    }


}

function checkCol(x, y) {

    if(y-1 >= 0 && y + 1 < numCols) {
        // Check above
        if (board[x][y + 1] === "*" && board[x][y+1].length > 0) {
            return true;
            // Check below
        } else if (board[x][y - 1] === "*" && board[x][y-1].length > 0) {
            return true;
            // Not found via column
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function checkDiagonals(x, y) {

    if(x-1 < 0 || y-1 < 0) {
        console.log("Out of bounds for left and bottom");
    } else if (x+1 >= numRows  || y+1 < numCols) {
        console.log("Out of bounds for right and top");
    } else {
        // Check top right diagonal
        if (board[x + 1][y + 1] === "*") {
            return true;
            // Check top left diagonal
        } else if (board[x - 1][y + 1] === "*") {
            return true;
            // Check bottom right diagonal
        } else if (board[x + 1][y - 1] === "*") {
            return true;
            // Check bottom left diagonal
        } else if (board[x - 1][y - 1] === "*") {
            return true;
            // Not found via diagonals
        } else {
            return false;

        }
    }

}

function init() {
    makeBoard();
    fillBoard();
    placeMines(1);
}

$(document).ready(function() {
    init();
});
