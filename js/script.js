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

/* let gameState = {
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
    div.setAttribute("data-i", i);
    boardGame.appendChild(div);
  }

  const cell = document.querySelectorAll("div.square").forEach((item) => {
    item.addEventListener("click", newMove);
  });
};

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = gameState.player;
  e.target.classList.add(gameState.player);
  e.target.removeEventListener('click', newMove);

  gameState.board[index] = gameState.player; // Atualize o estado do tabuleiro
  gameState.player = gameState.player === "X" ? "O" : "X";
} */

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

  gameState.size = parseInt(document.getElementById("boardSize").value);
  const boardGame = document.getElementById("boardGame");

  boardGame.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
  boardGame.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;

  gameState.board = [];

  for (let i = 0; i < gameState.size; i++) {
    gameState.board.push(new Array(gameState.size).fill(""));
    for (let j = 0; j < gameState.size; j++) {
      let div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("id", `square-${i}-${j}`);
      div.setAttribute("data-i", i);
      div.setAttribute("data-j", j);
      boardGame.appendChild(div);
    }
  }

  const cells = document.querySelectorAll("div.square");
  cells.forEach((item) => {
    item.addEventListener("click", newMove);
  });
};

function newMove(e) {
  if (gameState.gameOver) {
    return;
  }

  const row = parseInt(e.target.getAttribute("data-i"));
  const col = parseInt(e.target.getAttribute("data-j"));

  if (gameState.board[row][col] !== "") {
    return;
  }

  e.target.innerHTML = gameState.player;
  e.target.classList.add(gameState.player);

  gameState.board[row][col] = gameState.player;

  if (checkForWin(row, col)) {
    gameState.gameOver = true;
    gameState.winner = gameState.player;
    console.log(`Player ${gameState.winner} wins!`);
  } else {
    gameState.player = gameState.player === "X" ? "O" : "X";
  }
}

function checkForWin(row, col) {
  const player = gameState.player;

  // Verificar linha
  if (gameState.board[row].every((cell) => cell === player)) {
    return true;
  }

  // Verificar coluna
  if (gameState.board.every((row) => row[col] === player)) {
    return true;
  }

  // Verificar diagonal principal
  if (row === col && gameState.board.every((row, i) => row[i] === player)) {
    return true;
  }

  // Verificar diagonal secundária
  if (
    row + col === gameState.size - 1 &&
    gameState.board.every((row, i) => row[gameState.size - 1 - i] === player)
  ) {
    return true;
  }

  return false;
}
