//é o objeto que armazena o estado do jogo
let gameState = {
  size: 3,
  board: [],
  gameStarted: false,
  gameMode: "",
  turn: "",
  player1: "",
  player2: "",
  gameOver: false,
  tie: false,
  winner: "",
};

let boardGame = [];

//responsavel por gerar o tabuleiro do jogo da velha na tela
const generateBoardGame = (gameMode) => {
  gameState.player1 = Math.random() < 0.5 ? "X" : "O";

  if (gameState.player1 === "O") {
    gameState.player2 = "X";
  } else {
    gameState.player2 = "O";
  }

  gameState.turn = Math.random() < 0.5 ? "X" : "O";

  console.log(gameState);

  if (gameState.gameStarted) {
    //verifica se o jogo já foi iniciado e impede que seja iniciado novamente
    return;
  }

  gameState.gameMode = gameMode === 2 ? "bot" : "pvp"; //se gameMode for igual a 2, o jogo será contra o bot, caso contrário, será pvp
  gameState.gameStarted = true;

  console.log(gameState.gameMode);

  gameState.size = parseInt(document.getElementById("boardSize").value); //captura o valor do input e converte para inteiro e armazena em gameState.size

  gameState.board = [];

  //cria o tabuleiro do jogo da velha com uma div para cada célula do tabuleiro
  createDivsBoard();

  //adiciona o evento de click a cada célula do tabuleiro do jogo da velha chamando o newaction
  const cells = document.querySelectorAll("div.square");
  cells.forEach((item) => {
    item.addEventListener("click", newAction);
  });

  //remove #gameHeader and content
  const gameHeader = document.getElementById("gameHeader");

  while (gameHeader.firstChild) {
    gameHeader.removeChild(gameHeader.lastChild);
  }

  changeGameHeader();

  if (gameState.gameMode === "bot" && gameState.turn === gameState.player2) {
    setTimeout(botMove, 50);
  }
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

  const result = checkForWin(row, col);

  if (result === "tie") {
    console.log(gameState);
    gameState.tie = true;
    gameState.gameOver = true;
    openEndGameModal();
  } else if (result) {
    console.log(gameState);
    gameState.gameOver = true;
    gameState.winner = gameState.turn;
    openEndGameModal();
  } else {
    changeTurn();
    gameState.turn = gameState.turn === "X" ? "O" : "X";
    console.log(gameState);
    if (gameState.gameMode === "bot" && gameState.turn === gameState.player2) {
      setTimeout(botMove, 200);
      return;
    }
  }
}

//function to change the gameturn square div
function changeTurn() {
  const turnImage = document.querySelector(".gameTurn");
  turnImage.classList.remove(gameState.turn === "X" ? "cross" : "circle");
  turnImage.classList.add(gameState.turn === "X" ? "circle" : "cross");
}

function resetGame() {
  closeEndGameModal();
  gameState.gameStarted = false;
  gameState.gameOver = false;
  gameState.winner = "";
  gameState.turn = gameState.player1 === "X" ? "O" : "X";

  const cells = document.querySelectorAll("div.square");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("cross", "circle");
    gameState.board = gameState.board.map((row) => row.map(() => ""));
  });

  changeGameHeader();
}

function openEndGameModal() {
  const gameStatus = document.getElementById("gameStatus");
  if(!gameState.tie){
    const winner = document.getElementById("winnerSquare");
    winner.classList.add(gameState.winner === "X" ? "cross" : "circle");
    gameStatus.innerHTML = "O vencedor é:";
  } else {
    gameStatus.innerHTML = "Empate!";
  }

  const modal = document.getElementById("endGameModal");
  modal.style.display = "flex";
}

function closeEndGameModal() {
  const modal = document.getElementById("endGameModal");
  modal.style.display = "none";
}

function returnHome() {
  location.reload();
}
