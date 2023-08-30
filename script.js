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

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
      const col = index % numCols;
      const row = lowestRow[col];
      
      if (row < numRows && cellIsEmpty(cell)) { // Check if the column has available rows and the cell is empty
          const cellToPlace = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
          cellToPlace.classList.add(currentPlayer);
          cellToPlace.style.setProperty('--row', row-7);
          cellToPlace.classList.add('falling', currentPlayer);
          switchPlayer();
          lowestRow[col]++; // Update the lowest row for the column
      }

      // Remove the falling class after the animation is complete
      cellToPlace.addEventListener('animationend', () => {
        cellToPlace.classList.remove('falling');
    }, { once: true });
  });
});

console.log('Script loaded successfully.');