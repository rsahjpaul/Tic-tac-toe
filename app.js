const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message;
  };
  return {
    renderMessage,
  }
})();

const gameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameBoard[index] = value;
    render();
  };

  const getGameBoard = () => gameBoard;

  return {
    render,
    update,
    getGameBoard,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };

  let checkForWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }

    return false;
  };

  let checkForTie = (board) => {
    return board.every((cell) => cell !== "");
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }

    let index = parseInt(event.target.id.split("-")[1]);
    if (gameBoard.getGameBoard()[index] !== "") return;

    gameBoard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    if (
      checkForWin(gameBoard.getGameBoard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} wins`
      );
    } else if (checkForTie(gameBoard.getGameBoard())) {
      gameOver = true;
      displayController.renderMessage("TIE");
    }
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.update(i, "");
    }
    gameBoard.render();
    gameOver = false;
    document.querySelector("#message").innerHTML = "";
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();


});

const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", () => {
  Game.start();
});

let gameTile = document.querySelectorAll(".square");

gameTile.forEach((tile) => {
  tile.addEventListener("mousedown", () => {
    console.log("click");
  });
});
