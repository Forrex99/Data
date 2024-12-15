const gameContainer = document.getElementById("game");
const statusDisplay = document.getElementById("status");
const GRID_SIZE = 20; // ขนาดกระดาน
const WIN_CONDITION = 5; // จำนวนที่ต้องต่อกันเพื่อชนะ

let board = [];
let currentPlayer = "X";
let gameActive = true;

// สร้างกระดานเกม
function createBoard() {
  for (let row = 0; row < GRID_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      gameContainer.appendChild(cell);
      board[row][col] = "";
      cell.addEventListener("click", handleCellClick);
    }
  }
}

// ตรวจสอบเงื่อนไขชนะ
function checkWin(row, col) {
  const directions = [
    { x: 0, y: 1 }, // แนวนอน
    { x: 1, y: 0 }, // แนวตั้ง
    { x: 1, y: 1 }, // แนวทแยงขวาล่าง
    { x: 1, y: -1 }, // แนวทแยงซ้ายล่าง
  ];

  for (let { x, y } of directions) {
    let count = 1;

    for (let step = 1; step < WIN_CONDITION; step++) {
      const newRow = row + step * x;
      const newCol = col + step * y;
      if (
        newRow >= 0 &&
        newRow < GRID_SIZE &&
        newCol >= 0 &&
        newCol < GRID_SIZE &&
        board[newRow][newCol] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
    }

    for (let step = 1; step < WIN_CONDITION; step++) {
      const newRow = row - step * x;
      const newCol = col - step * y;
      if (
        newRow >= 0 &&
        newRow < GRID_SIZE &&
        newCol >= 0 &&
        newCol < GRID_SIZE &&
        board[newRow][newCol] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
    }

    if (count >= WIN_CONDITION) return true;
  }

  return false;
}

// จัดการคลิกที่ช่อง
function handleCellClick(event) {
  if (!gameActive) return;

  const cell = event.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(row, col)) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// เริ่มเกม
createBoard();