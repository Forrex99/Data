let board = [];
let currentPlayer = "X";
const size = 15; // 15x15 grid for 5-in-a-row

// Initialize the board with empty cells
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

// Handle a click on the board
function handleSquareClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  // Prevent playing on already occupied squares
  if (board[row][col] !== null) return;

  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin(parseInt(row), parseInt(col))) {
    alert(`${currentPlayer} wins!`);
    restartGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
  }
}

// Check for a win (5 in a row)
function checkWin(row, col) {
  const directions = [
    { r: 0, c: 1 },  // Horizontal
    { r: 1, c: 0 },  // Vertical
    { r: 1, c: 1 },  // Diagonal /
    { r: 1, c: -1 }, // Diagonal \
  ];

  for (let { r, c } of directions) {
    let count = 1;
    // Check in both directions (positive and negative)
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

// Restart the game
function restartGame() {
  initializeBoard();
  currentPlayer = "X";
}

// Initialize the game on page load
initializeBoard();