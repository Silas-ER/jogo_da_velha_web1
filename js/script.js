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
  size: 3,
  board: [],
  gameStarted: false,
  player: "X",
  gameOver: false,
  winner: "",
};

let boardGame = [];

const generateBoardGame = () => {
  if (gameState.gameStarted) {
    return;
  }

  gameState.gameStarted = true;

  gameState.size = document.getElementById("boardSize").value;
  const boardGame = document.getElementById("boardGame");

  boardGame.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
  boardGame.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;

  gameState.board = [];

  for (let i = 0; i < gameState.size * gameState.size; i++) {
    gameState.board.push("");
    let div = document.createElement("div");
    div.classList.add("square");
    div.setAttribute("id", `square-${i}`);
    boardGame.appendChild(div);
  }

  const cell = document.querySelectorAll("div.square").forEach((item) => {
    item.addEventListener("click", newMove);
  });
};

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = gameState.player;
  e.target.removeEventListener('click', newMove);
}

/* const handleCellClick = (index) => {
  if (gameState.gameOver || gameState.board[index] !== "") {
    return;
  }

  const currentPlayer = gameState.player;
  const cell = document.getElementById(`square-${index}`);

  placeMark(cell, currentPlayer);
  gameState.board[index] = currentPlayer;

  placeMark(cell, currentPlayer);
  gameState.board[index] = currentPlayer;

  const isWin = checkForWin(currentPlayer);
  const isDraw = checkForDraw();

  if (isWin || isDraw) {
    endGame(isDraw);
  } else {
    swapTurns();
  }
};

const placeMark = (cell, classToAdd) => {
  cell.textContent = classToAdd; // Adiciona 'X' ou 'O' ao conteúdo da célula
  cell.classList.add(classToAdd); // Adiciona a classe para estilização
}; */
