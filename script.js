let currentPlayer = 'player1';

function switchPlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
}

function cellIsEmpty(cell) {
  return !cell.classList.contains('player1') && !cell.classList.contains('player2');
}

const cells = document.querySelectorAll('.cell');
const numRows = 6; // Number of rows in the grid
const numCols = 7; // Number of columns in the grid
const lowestRow = Array(numCols).fill(0); // Initialize the lowest row in each column
const board = new Array(numRows).fill(null).map(() => new Array(numCols).fill(null));

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
      const col = index % numCols;
      const row = lowestRow[col];
      
      if (row < numRows && cellIsEmpty(cell)) { // Check if the column has available rows and the cell is empty
          const cellToPlace = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
          cellToPlace.classList.add(currentPlayer);
          placePiece(row, col, currentPlayer);
          cellToPlace.style.setProperty('--row', row-7);
          cellToPlace.classList.add('falling', currentPlayer);
          if (checkForWin(currentPlayer)) {
              winnerElement.textContent = currentPlayer;
              winnerAlert.style.display = 'block';
              return;
          }
          if (checkForDraw()) {
              drawAlert.style.display = 'block';
              return;
          }
          switchPlayer();
          lowestRow[col]++; // Update the lowest row for the column
      }

      // Remove the falling class after the animation is complete
      cellToPlace.addEventListener('animationend', () => {
        cellToPlace.classList.remove('falling');
    }, { once: true });
  });
});

function placePiece(row, col, player) {
  board[row][col] = player;
}

function checkForWin(player) {
  // Check rows
  for (let row = 0; row < numRows; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
          if (
              board[row][col] === player &&
              board[row][col + 1] === player &&
              board[row][col + 2] === player &&
              board[row][col + 3] === player
          ) {
              console.log('Row win');
              return true;
          }
      }
  }

  // Check columns
  for (let col = 0; col < numCols; col++) {
      for (let row = 0; row <= numRows - 4; row++) {
          if (
              board[row][col] === player &&
              board[row + 1][col] === player &&
              board[row + 2][col] === player &&
              board[row + 3][col] === player
          ) {
              console.log('Column win');
              return true;
          }
      }
  }

  // Check diagonals
  for (let row = 0; row <= numRows - 4; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
          if (
              board[row][col] === player &&
              board[row + 1][col + 1] === player &&
              board[row + 2][col + 2] === player &&
              board[row + 3][col + 3] === player
          ) {
              return true;
          }
          if (
              board[row][col + 3] === player &&
              board[row + 1][col + 2] === player &&
              board[row + 2][col + 1] === player &&
              board[row + 3][col] === player
          ) {
              console.log('Diagonal win');
              return true;
          }
      }
  }

  console.log('No win');
  return false;
}

function checkForDraw() {
  for (const cell of cells) {
      if (!cellIsEmpty(cell)) {
          continue;
      }
      return false; // If any empty cell is found, the game is not a draw
  }
  return true; // If all cells are filled, the game is a draw
}

const winnerElement = document.querySelector('.winner');
const winnerAlert = document.querySelector('.winner-alert');
const drawAlert = document.querySelector('.draw-alert');

console.log('Script loaded successfully.');