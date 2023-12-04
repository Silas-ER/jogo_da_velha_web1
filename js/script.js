// document.addEventListener("DOMContentLoaded", function() {
//     const enterButton = document.getElementById('enter-button');
//     const optionsSection = document.getElementById('options');

//     enterButton.addEventListener('click', function() {
//         enterButton.style.display = 'none';
//         optionsSection.innerHTML = '';

//         const singlePlayerButton = document.createElement('button');
//         singlePlayerButton.textContent = 'Jogar sozinho';

//         const twoPlayersButton = document.createElement('button');
//         twoPlayersButton.textContent = 'Jogar com dois jogadores';

//         optionsSection.appendChild(singlePlayerButton);
//         optionsSection.appendChild(twoPlayersButton);

//         optionsSection.style.display = 'block';
//     });
// });

let gameState = {
    board: [],
    gameStarted: false,
    player: 'X',
    gameOver: false,
    winner: ''
};

let boardGame = [];

const generateBoardGame = () => {
    if (gameState.gameStarted) {
        return;
    }

    gameState.gameStarted = true;

    let boardSize = document.getElementById('boardSize').value;
    const boardGame = document.getElementById('boardGame')

    boardGame.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    boardGame.style.gridTemplateRows  = `repeat(${boardSize}, 1fr)`;

    for (let i = 0; i < boardSize * boardSize; i++) {
        gameState.board.push('');
        let div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute('id', `square-${i}`);
        boardGame.appendChild(div);
    }
};