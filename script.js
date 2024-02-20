const Gameboard = (function () {
    let gameboard = [];
    let roundCounter = 0;

    const showBoardState = () => console.log(gameboard);

    const pickCell = function (playerMark, cell) {
        if (!(!!gameboard[cell]) || cell === '') {
            gameboard[cell] = playerMark;            
        }
        else {
            return console.log('This cell is already taken');
        }
        console.log(roundCounter++);
        winCheck(playerMark);
    };

    const resetBoard = function() {
        gameboard = [];
        roundCounter = 0;
    };

    const testik = (cell) => console.log(!(!!gameboard[cell]));

    const winCheck = function (playerMark) {
        if ((gameboard[0] === playerMark && gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6]) ||
        (gameboard[1] === playerMark && gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7]) ||
        (gameboard[2] === playerMark && gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8])) {
            console.log('win');
        }
        else if ((gameboard[0] === playerMark && gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]) ||
        (gameboard[3] === playerMark && gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]) ||
        (gameboard[6] === playerMark && gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8])) {
            console.log('win');
        }
        else if ((gameboard[0] === playerMark && gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) ||
        (gameboard[2] === playerMark && gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6])) {
            console.log('win');
        }
        else if (roundCounter >= 8) {
            console.log('Draw');
        }
        else {
            console.log('no win');
        }
    }

    return { pickCell, resetBoard, showBoardState, testik, winCheck, };
})();

const createPlayer = function (chosenMark, name) {
    const playerMark = chosenMark;
    const placeMark = function (cell) {
        return Gameboard.pickCell(playerMark, cell);
    }
    const showMark = () => playerMark;

    return { name, placeMark, showMark }
};