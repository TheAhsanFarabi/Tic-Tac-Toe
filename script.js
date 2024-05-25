$(document).ready(function () {
  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const squares = $(".square");
  const statusElement = $("#status");

  function renderBoard() {
    for (let i = 0; i < 9; i++) {
      if (board[i] === playerX) {
        squares.eq(i).html('<i class="fas fa-times"></i>');
      } else if (board[i] === playerO) {
        squares.eq(i).html('<i class="far fa-circle"></i>');
      } else {
        squares.eq(i).html("");
      }
    }
  }

  function handleSquareClick() {
    const index = parseInt($(this).attr("data-index"));
    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      renderBoard();
      if (checkWinner()) {
        statusElement.text(`Player ${currentPlayer} wins!`);
        gameActive = false;
      } else if (checkDraw()) {
        statusElement.text("It's a draw!");
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        statusElement.text(`Player ${currentPlayer}'s turn`);
      }
    }
  }

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    return !board.includes("");
  }

  function resetGame() {
    currentPlayer = playerX;
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusElement.text(`Player ${currentPlayer}'s turn`);
    renderBoard();
  }

  squares.on("click", handleSquareClick);

  $("#reset-btn").on("click", function () {
    resetGame();
  });

  resetGame();
});
