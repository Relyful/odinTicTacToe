const form = document.querySelector('form');
const winner = document.querySelector('.winner');
const divCurrentPlayer = document.querySelector('.currentPlayer');

// object that holds gameboard array and has functions that allow us to place mark on board,
// show gameboard array, reset the board and check for win state
const gameboard = (function () {
    let gameboard = [];
    let roundCounter = 0;

    const showBoardState = () => gameboard;

    // check for available cell 
    const pickCell = function (playerMark, cell) {
        if (!gameboard[cell] || cell === '') {
            gameboard[cell] = playerMark;            
        }
        else {
            return 3;
        }
        return winCheck(playerMark);
    };

    const resetBoard = function() {
        gameboard = [];
        roundCounter = 0;
    };
    
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
        // draw after 9 rounds
        else if (++roundCounter >= 9) {
            return 2;
        }
        else {
            return 0;
        }
    };

    return { pickCell, resetBoard, showBoardState, winCheck, };
})();

// Factory that creates Player object with name and function to place their mark on the board and function to show their mark
const createPlayer = function (chosenMark, name) {
    const playerMark = chosenMark;
    const placeMark = function (cell) {
        return gameboard.pickCell(playerMark, cell);
    }
    const showMark = () => playerMark;

    return { name, placeMark, showMark }
};

// Main game object that creates player and then runs game logic until someone wins or the game ends in draw
const createGame = function () {
    let player1;
    let player2;
    let player1Name = document.querySelector('#p1Name');
    let player2Name = document.querySelector('#p2Name');
    // Get names from name form and create player objects with it automatic assign X and O
    const pickNames = function () {
        if (player1Name.value === '') {
            player1 = createPlayer('x', 'Player1' );
        }
        else {
            player1 = createPlayer('x', player1Name.value);
        }

        if (player2Name.value === '') {
            player2 = createPlayer('o', 'Player2' );
        }
        else {
            player2 = createPlayer('o', player2Name.value);
        }
    };

    // calls placeMark from player and returns win draw or no win
    const playerChoice = function (player, cell) {
        
        let result = player.placeMark(cell);
        if (result === 1) {            
            return 1;
        }
        else if (result === 3) {
            return 3;
        }
        else if (result === 2) {            
            return 2;
        }
        else if (result === 0) {
            return 0;
        }
    };
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    return { playerChoice, pickNames, getPlayer1, getPlayer2 };
};

// Main function which purpose is to run the game and show it on the page with DOM objects
const showGame = (function () {    
    let game = createGame();   
    let currentPlayer;       
    const boardDiv = document.querySelector('.gameBoard');
    const cPlayerDiv = document.querySelector('.currentPlayer');
    const startBut = document.querySelector('.startBut');
    const resetBut = document.querySelector('.resetBut');    
    let currentBoard;

    // start game button behaviour
    startBut.addEventListener('click', (e) => {
        e.preventDefault();
        playGame();
        form.reset();
        form.style.display = 'none';
        resetBut.style.display = 'block';
        divCurrentPlayer.style.display = 'block';
        winner.style.display = 'none';
    });

    // reset game button behaviour
    resetBut.addEventListener('click', (e) => {
        gameboard.resetBoard();
        drawBoard();
        drawPlayerName('');
        form.style.display = 'flex';
        resetBut.style.display = 'none';
        divCurrentPlayer.style.display = 'none';
        winner.style.display = 'none';
    });

    // draws 9 buttons on board and gives it class 'cell' and draws content inside cell based on gameboard array 
    const drawBoard = function () {
        boardDiv.innerHTML = '';
        currentBoard = gameboard.showBoardState();
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = currentBoard[i];
            boardDiv.appendChild(cell);
        }        
    };

    // Show current player on webpage
    const drawPlayerName = function (cPlayer) {
        cPlayerDiv.textContent = `Current Player: ${cPlayer}`;
    };
    
    // Most of the game happens here, this function is first called when game is started ,
    // after that this function keeps calling itself until someone wins the game
    // after game ends, shows result
    function clickCell(player) {        
        const cellDivs = document.querySelectorAll('.cell');
        cellDivs.forEach((element) => {     
            //only add event listener when cell is empty
            if (element.textContent === "") {
                element.addEventListener('click', function () {
                    const player1 = game.getPlayer1();
                    const player2 = game.getPlayer2();
                    let result = game.playerChoice(player, element.dataset.index);
                    if (result === 1) {                        
                        drawBoard();
                        drawPlayerName('');                        
                        winner.textContent = `${player.name} won!`;
                        divCurrentPlayer.style.display = 'none';
                        winner.style.display = 'block';
                        return;
                    }
                    else if (result === 2) {                        
                        drawBoard();
                        drawPlayerName('');                        
                        winner.textContent = 'Draw!';
                        divCurrentPlayer.style.display = 'none';
                        winner.style.display = 'block';
                        return;
                    }
                    drawBoard();
                    if (currentPlayer === player1) {
                        currentPlayer = player2;
                    }                     
                    else {
                        currentPlayer = player1;
                    } 
                    drawPlayerName(currentPlayer.name);
                    clickCell(currentPlayer);               
                })
            }
        })
    };

    // game starter function, this gets called when player presses start game button
    const playGame = function () {
        game.pickNames();
        const player1 = game.getPlayer1();
        currentPlayer = player1;
        drawBoard();
        drawPlayerName(currentPlayer.name);
        clickCell(currentPlayer);
    }
    return { playGame, drawBoard };
})();

// Draws board when game is loaded
showGame.drawBoard();