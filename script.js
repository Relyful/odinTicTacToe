const Gameboard = (function () {
    let gameboard = [];

    const showBoardState = () => console.log(gameboard);

    const pickCell = function (playerMark, cell) {
        if (!(!!gameboard[cell]) || cell === '') {
            gameboard[cell] = playerMark;            
        }
        else {
            return console.log('This cell is already taken');
        }
    };

    const resetBoard = () => gameboard = [];

    const testik = (cell) => console.log(!(!!gameboard[cell]));
    return { pickCell, resetBoard, showBoardState, testik };
})();