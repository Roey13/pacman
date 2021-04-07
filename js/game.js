'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🎂'
const CHERRY = '🍒'

var elGameOver = document.querySelector('.game-over')
var elScore = document.querySelector('h2 span');

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    emptyCells = []
    elGameOver.style.display = `none`
    elGameOver.style.backgroundColor = `red`
    elGameOver.innerHTML = `<h1>Game Over!</h1>`
    gGame.score = 0;
    elScore.innerHTML = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    createRestart()
    setInterval(addCherry, 1000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1) board[i][j] = SUPERFOOD;
            if (i === SIZE - 2 && j === 1) board[i][j] = SUPERFOOD;
            if (i === 1 && j === SIZE - 2) board[i][j] = SUPERFOOD;
            if (i === SIZE - 2 && j === SIZE - 2) board[i][j] = SUPERFOOD;

        }

    }

    return board;
}


function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom

    elScore.innerText = gGame.score;
    if (emptyCells.length === 60) {
        elGameOver.style.display = `block`
        elGameOver.style.backgroundColor = `green`
        elGameOver.innerHTML = `<h1>Victory!</h1>`
        gameOver()
    }

}

function createRestart() {
    var elRestart = document.querySelector('.restart')
    var strButton = `<button onclick="init()">Start Again</button>`
    elRestart.innerHTML = strButton;
    (gGame.isOn ? elRestart.style.display = `none` : elRestart.style.display = `block`);
}

function gameOver() {
    elGameOver.style.display = `block`
    gGame.isOn = false;
    createRestart()
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null

    // TODO
}


function addCherry() {
    var ranNum = getRandomIntInclusive(0, emptyCells.length - 1)

    if (emptyCells.length > 0) {
        var currEmpty = gBoard[emptyCells[ranNum].i][emptyCells[ranNum].j]

        if (currEmpty !== PACMAN) {
            gBoard[emptyCells[ranNum].i][emptyCells[ranNum].j] = CHERRY;
            renderCell(emptyCells[ranNum], CHERRY)
        }
    }
}

