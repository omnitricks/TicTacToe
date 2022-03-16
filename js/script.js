window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerTurn = document.querySelector('.Player');
    const resetBtn = document.querySelector('#reset');
    const announcer = document.querySelector('.result');

    let board = ['', '', '', '', '', '', '', '', ''];
    // let currentPlayer = 'xmark';
    let isGameActive = true;
    let ai = 'circle';
    let human = 'xmark';
    let currentPlayer = human;

    const PLAYER1_WON = 'PLAYER1_WON';
    const PLAYER2_WON = 'PLAYER2_WON';
    const TIE = 'TIE';


//    indexes within the board
//     0 | 1 | 2
//    ---+---+---
//     3 | 4 | 5
//    ---+---+---
//     6 | 7 | 8

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

if (roundWon) {
        announce(currentPlayer === 'xmark' ? PLAYER1_WON : PLAYER2_WON);
        isGameActive = false;
        return;
    }

if (!board.includes(''))
    announce(TIE);
}

// Print who won
const announce = (type) => {
    switch(type){
        case PLAYER2_WON:
            announcer.innerHTML = 'Player <span class="Playercircle"><i class="fa-regular fa-circle"></i></span> Won';
            break;
        case PLAYER1_WON:
            announcer.innerHTML = 'Player <span class="Playerxmark"><i class="fa-solid fa-xmark"></i></span> Won';
            break;
        case TIE:
            announcer.innerText = 'Tie';
            break;
    }
    announcer.classList.remove('hidden');
};

// Check if tile is already occupied
const isValidAction = (tile) => {
    if (tile.innerHTML === '<i class="fa-solid fa-xmark"></i>' || tile.innerHTML === '<i class="fa-regular fa-circle"></i>'){
        return false;
    }

    return true;
};

// innerHtml conditions for fontawesome
const fontAwesome = () => {
    if(currentPlayer== 'circle'){
        return style = 'regular';
        
    }else{
        return style = 'solid';
    }
};

const updateBoard =  (index) => {
    board[index] = currentPlayer;
}



function bestMove() {
        var random = Math.floor(Math.random() * 8);
        if(isValidAction(tiles[random]) && isGameActive) {
            tiles[random].click();
        }else{
            bestMove();
        }
}




// Print Player turn 
const changePlayer = () => {
    playerTurn.classList.remove(`Player${currentPlayer}`);
    currentPlayer = currentPlayer  === human ? ai : human;
    
    fontAwesome();

    playerTurn.innerHTML = '<i class="fa-' + style + ' fa-' + currentPlayer + '"></i>';
    playerTurn.classList.add(`Player${currentPlayer}`);

    if(currentPlayer == ai){
        bestMove();
    }
}

// Player action
const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {

        fontAwesome();

        tile.innerHTML = '<i class="fa-' + style + ' fa-' + currentPlayer + '"></i>';
        tile.classList.add(`Player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

// Reset
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hidden');

    if (currentPlayer === 'circle') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('Playerxmark');
        tile.classList.remove('Playercircle');
    });
}

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

resetBtn.addEventListener('click', resetBoard);
});