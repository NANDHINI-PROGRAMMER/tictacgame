const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];
  
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) return 'Draw';
  return null;
}

function handleClick(index) {
  if (gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  render();

  const result = checkWinner();
  if (result) {
    statusText.textContent = result === 'Draw' ? "It's a draw!" : `${result} wins!`;
    board.querySelectorAll('.cell').forEach(cell => cell.onclick = null); // disable clicks
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function render() {
  board.innerHTML = '';
  gameBoard.forEach((val, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = val;
    cell.onclick = () => handleClick(index);
    board.appendChild(cell);
  });
}

render();
