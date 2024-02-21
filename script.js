const gameboard = (function () {
    let gameboard = [];
    let roundCounter = 0;

    const showBoardState = () => console.log(gameboard);

    const pickCell = function (playerMark, cell) {
        if (!gameboard[cell] || cell === '') {
            gameboard[cell] = playerMark;            
        }
        else {
            console.log('This cell is already taken');
            return 3;
        }
        console.log(roundCounter++);
        return winCheck(playerMark);
    };

    const resetBoard = function() {
        gameboard = [];
        roundCounter = 0;
    };

    const testik = (cell) => console.log(gameboard[cell]);

    const winCheck = function (playerMark) {
        if ((gameboard[0] === playerMark && gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6]) ||
        (gameboard[1] === playerMark && gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7]) ||
        (gameboard[2] === playerMark && gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8])) {
            return 1;
        }
        else if ((gameboard[0] === playerMark && gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]) ||
        (gameboard[3] === playerMark && gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]) ||
        (gameboard[6] === playerMark && gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8])) {
            return 1;
        }
        else if ((gameboard[0] === playerMark && gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) ||
        (gameboard[2] === playerMark && gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6])) {
            return 1;
        }
        else if (roundCounter >= 8) {
            return 2;
        }
        else {
            return 0;
        }
    }

    return { pickCell, resetBoard, showBoardState, testik, winCheck, }; //Remove testik when done
})();

const createPlayer = function (chosenMark, name) {
    const playerMark = chosenMark;
    const placeMark = function (cell) {
        return gameboard.pickCell(playerMark, cell);
    }
    const showMark = () => playerMark;

    return { name, placeMark, showMark }
};

const game = function () {
    player1 = createPlayer('x', prompt('Player 1 name?', 'Player1'));
    player2 = createPlayer('o', prompt('Player 2 name?', 'Player2'));

    const playerChoice = function (player) {
        do {
            currentPlayerChoice = prompt(`${player.name} pick your position (0-8)!`);
        }
        while (+currentPlayerChoice < 0 && +currentPlayerChoice > 8);
        let result = player.placeMark(currentPlayerChoice);
        if (result === 1) {
            gameboard.resetBoard();
            console.log(`${player.name} won!`);
            return 1;
        }
        else if (result === 3) {
            return 3;
        }
        else if (result === 2) {
            gameboard.resetBoard();
            console.log('Draw!')
            return 2;
        }
        else if (result === 0) {
            return 0;
        }
    }

    const gameRound = function () {
        do {
            state = playerChoice(player1);
            if (state === 1 || state === 2) {
                return state;
            }            
        }
        while (state === 3);
        
        do {
            state = playerChoice(player2);
        }
        while (state === 3);        
        return state;
    }
    
    do {
        state = gameRound();
        console.log(`State is ${state}`);
    }
    while(state === 0);
    return;    
}