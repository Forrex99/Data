let board = [];
let currentPlayer = "X";
const size = 19;

function initializeBoard() {
  board = Array.from({ length: size }, () => Array(size).fill(null));
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = i;
      square.dataset.col = j;
      square.addEventListener("click", handleSquareClick);
      boardElement.appendChild(square);
    }
  }
}

function handleSquareClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board[row][col] !== null) return;

  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer === "X" ? "&#xf00d;" : "&#xf10c;"; // Using FontAwesome icons

  if (currentPlayer === "X") {
    event.target.classList.add("X");
  } else {
    event.target.classList.add("O");
  }

  if (checkWin(parseInt(row), parseInt(col))) {
    alert(`${currentPlayer} wins!`);
    restartGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(row, col) {
  const directions = [
    { r: 0, c: 1 }, 
    { r: 1, c: 0 },
    { r: 1, c: 1 },
    { r: 1, c: -1 },
  ];

  for (let { r, c } of directions) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
      const newRow = row + r * i;
      const newCol = col + c * i;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && board[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }
    for (let i = 1; i < 5; i++) {
      const newRow = row - r * i;
      const newCol = col - c * i;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && board[newRow][newCol] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }
    if (count >= 5) return true;
  }
  return false;
}

function restartGame() {
  initializeBoard();
  currentPlayer = "X";
}

initializeBoard();