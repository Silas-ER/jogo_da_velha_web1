function createDivsBoard() {
    const boardGame = document.getElementById("boardGame");

    boardGame.style.gridTemplateColumns = `repeat(${gameState.size}, 1fr)`;
    boardGame.style.gridTemplateRows = `repeat(${gameState.size}, 1fr)`;

    for (let i = 0; i < gameState.size; i++) {
        gameState.board.push(new Array(gameState.size).fill(""));
        for (let j = 0; j < gameState.size; j++) {
            let div = document.createElement("div");
            div.classList.add("square");
            div.setAttribute("id", `square-${i}-${j}`);
            div.setAttribute("data-i", i);
            div.setAttribute("data-j", j);

            //seta as bordas das células do tabuleiro
            if (i < gameState.size) {
                div.style.borderTop = "none";
            }
            if (j < gameState.size) {
                div.style.borderLeft = "none";
            }
            if (j === gameState.size - 1) {
                div.style.borderRight = "none";
            }
            if (i === gameState.size - 1) {
                div.style.borderBottom = "none";
            }

            boardGame.appendChild(div); //adiciona o elemento div ao elemento boardGame
        }
    }
}

function changeGameHeader() {
    document.getElementById("gameHeader").innerHTML = `<h2>Vez do jogador:</h2>`;
    const rotationImage = document.createElement("span");

    rotationImage.setAttribute("id", "gameTurn");
    rotationImage.classList.add("square");
    gameHeader.appendChild(rotationImage);

    rotationImage.classList.add(gameState.turn === "X" ? "cross" : "circle");
    rotationImage.classList.add("gameTurn");
    rotationImage.innerHTML = gameState.turn;
}

function botMove() {
    if (gameState.gameOver) {
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

    // if(gameState.board.every(row => row.every(cell => cell !== ""))) {
    //   alert("velha");
    //   return true;
    // }

    return false;
}
