'use strict'
const PACMAN = '😷';
var emptyCells = [];




var gPacman;

function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
    }
    
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver

    if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true;
        SUPERFOOD === WALL;
        setTimeout(function() {
            gPacman.isSuper = false;
            while (gGhosts.length < 3) createGhost(gBoard)
            
        },
            5000)
        // console.log('gPacman.isSuper',gPacman.isSuper);
    }

    if (!gPacman.isSuper) {
        if (nextCell === GHOST) {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            emptyCells.push(gPacman.location)
            return
        }
    } else {
        if (nextCell === GHOST){
            for (var i = 0; i <gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i
                    && gGhosts[i].location.j === nextLocation.j){
                        gGhosts.splice(i, 1)
                        // emptyCells.push(gGhosts[i].location)
                    }
            }
        }
    }

    while (gGhosts.length > 3 && gPacman.isSuper === false){
        createGhost(gBoard)
    }


    if (nextCell === FOOD || nextCell === SUPERFOOD) {
        emptyCells.push(gPacman.location)
        updateScore(1)
    }

    if (nextCell === CHERRY) updateScore(10)



    if (gBoard[nextLocation.i][nextLocation.j] === SUPERFOOD && gPacman.isSuper){
        // console.log(gBoard[nextLocation.i][nextLocation.j]);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    
    // Move the pacman
    // update the model
    
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    
    // update the DOM
    renderCell(gPacman.location, PACMAN);
    
  

    // console.log('emptyCells',emptyCells);
    console.log('emptyCells',emptyCells);
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default:
            return null
    }
    return nextLocation;
}

