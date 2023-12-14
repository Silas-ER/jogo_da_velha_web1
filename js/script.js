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

  if (result === 'tie') {
      gameState.gameOver = true;
      alert(`Deu velha!`);
  } else if (result) {
      gameState.gameOver = true;
      gameState.winner = gameState.turn;
      alert(`O jogador com ${gameState.turn} venceu!`);
  } else {
      changeTurn();
      gameState.turn = gameState.turn === "X" ? "O" : "X";

      if (gameState.gameMode === "bot" && gameState.turn === gameState.player1) {
          setTimeout(botMove, 500);
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
  gameState.gameStarted = false;
  gameState.gameOver = false;
  gameState.winner = "";
  gameState.turn = gameState.player1 === "X" ? "O" : "X";
  
  const cells = document.querySelectorAll("div.square");
  cells.forEach((cell) => {
    cell.innerHTML = ""; // Remover "X" e "O" das células
    cell.classList.remove("cross", "circle"); // Remover estilos de "X" e "O"
    gameState.board = gameState.board.map(row => row.map(() => "")); // Limpar o estado do tabuleiro
  });
  
  changeGameHeader();
}

function returnHome() {
  location.reload();
}