let currentPlayer = 'player1';

function switchPlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
}

function cellIsEmpty(cell) {
  return !cell.classList.contains('player1') && !cell.classList.contains('player2');
}


const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
      console.log('Cell clicked!'); // Check if event is triggered
      if (cellIsEmpty(cell)) {
          console.log('Cell is empty.'); // Check if cellIsEmpty is true
          cell.classList.add(currentPlayer);
          switchPlayer();
      } else {
          console.log('Cell is not empty.'); // Check if cellIsEmpty is false
      }
  });
});

console.log('Script loaded successfully.');