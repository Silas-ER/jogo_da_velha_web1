const cross = "&#10060";

let gameState = {
  size: 3,
  board: [],
  gameStarted: false,
  gameMode: "",
  player: cross,
  gameOver: false,
  winner: "",
};

let boardGame = [];

const generateBoardGame = (gameMode) => {
  if (gameState.gameStarted) {
    return;
  }

  gameState.gameMode = gameMode === 2  ? "bot" : "pvp";
  gameState.gameStarted = true;

  console.log(gameState.gameMode);
  
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
      
      if( i < gameState.size) {
        div.style.borderTop = "none";
      }
      if( j < gameState.size) {
        div.style.borderLeft = "none";
      }
      if( j === gameState.size - 1) {
        div.style.borderRight = "none";
      }
      if( i === gameState.size - 1) {
        div.style.borderBottom = "none";
      }

      boardGame.appendChild(div);
    }

  }

  const cells = document.querySelectorAll("div.square");
  cells.forEach((item) => {
    item.addEventListener("click", newAction);
  });
};

function newAction(e) {
  if (gameState.gameOver) {
    return;
  }

  const row = parseInt(e.target.getAttribute("data-i"));
  const col = parseInt(e.target.getAttribute("data-j"));

  if (gameState.board[row][col] !== "") {
    return;
  }

  // e.target.innerHTML = gameState.player;
  e.target.classList.add(gameState.player === cross ? "cross" : "circle");

  gameState.board[row][col] = gameState.player;

  if (checkForWin(row, col)) {
    gameState.gameOver = true;
    gameState.winner = gameState.player;
    alert(`Player ${gameState.winner === cross ? "X" : "O"} wins!`);
  } else {
    gameState.player = gameState.player === cross ? "O" : cross;
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
