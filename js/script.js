
//é o objeto que armazena o estado do jogo
let gameState = {
  size: 3,
  board: [],
  gameStarted: false,
  gameMode: "",
  turn: "",
  player1: "",
  gameOver: false,
  winner: "",
};

let boardGame = [];

//responsavel por gerar o tabuleiro do jogo da velha na tela
const generateBoardGame = (gameMode) => {
  gameState.turn = Math.random() < 0.5 ? "X" : "O";

  if (gameState.turn === "O") {
    gameState.player1 = "X";
  } else {
    gameState.player1 = "O";
  }

  console.log(gameState);

  if (gameState.gameStarted) { //verifica se o jogo já foi iniciado e impede que seja iniciado novamente
    return;
  }

  gameState.gameMode = gameMode === 2  ? "bot" : "pvp"; //se gameMode for igual a 2, o jogo será contra o bot, caso contrário, será pvp
  gameState.gameStarted = true;

  console.log(gameState.gameMode);
  
  gameState.size = parseInt(document.getElementById("boardSize").value); //captura o valor do input e converte para inteiro e armazena em gameState.size
  const boardGame = document.getElementById("boardGame");
  
  boardGame.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
  boardGame.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;

  gameState.board = [];

  //cria o tabuleiro do jogo da velha com uma div para cada célula do tabuleiro
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

      boardGame.appendChild(div); //adiciona o elemento div ao elemento boardGame
    }
  }

  //adiciona o evento de click a cada célula do tabuleiro do jogo da velha chamando o newaction
  const cells = document.querySelectorAll("div.square");
  cells.forEach((item) => {
    item.addEventListener("click", newAction);
  });

  //remove #gameHeader and content\
  const gameHeader = document.getElementById("gameHeader");
  gameHeader.parentNode.removeChild(gameHeader);
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

  // adiciona o símbolo do jogador na célula clicada
  // e.target.innerHTML = gameState.turn;
  e.target.classList.add(gameState.turn === "X" ? "cross" : "circle");

  gameState.board[row][col] = gameState.turn;

  if (checkForWin(row, col)) {
    gameState.gameOver = true;
    gameState.winner = gameState.turn;
    alert(`${gameState.turn} ganhou!`);
    document.getElementById("winner").innerHTML = gameState.winner;
  } else {
    gameState.turn = gameState.turn === "X" ? "O" : "X";
  }

  if (gameState.gameMode === "bot" && gameState.turn === gameState.player1) {
    setTimeout(botMove, 500);
  }
}

function checkForWin(row, col) {
  const turn = gameState.turn;

  // Verificar linha
  if (gameState.board[row].every((cell) => cell === turn)) {
    return true;
  }

  // Verificar coluna
  if (gameState.board.every((row) => row[col] === turn)) {
    return true;
  }

  // Verificar diagonal principal
  if (row === col && gameState.board.every((row, i) => row[i] === turn)) {
    return true;
  }

  // Verificar diagonal secundária
  if (
    row + col === gameState.size - 1 &&
    gameState.board.every((row, i) => row[gameState.size - 1 - i] === turn)
  ) {
    return true;
  }

  return false;
}


function botMove() {
  if (gameState.gameOver) {  // Prevent bot move if game is over
    return;
  }

  let row, col;

  do {
    row = Math.floor(Math.random() * gameState.size);
    col = Math.floor(Math.random() * gameState.size);
  } while (gameState.board[row][col] !== "");

  const cell = document.getElementById(`square-${row}-${col}`);
  cell.click();
}