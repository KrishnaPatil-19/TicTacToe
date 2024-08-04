// Initialize game state
let currentPlayer = 'X'; // Start with player X
const board = Array(9).fill(null); // Keeps track of the board state

// Function to update the turn indicator
function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turnIndicator');
    turnIndicator.value = `Player ${currentPlayer}'s Turn`;
}

// Function to handle marking the spot
function markTheSpot(event) {
  const button = event.target;
  const index = Array.from(button.parentNode.children).indexOf(button);

  // Check if the spot is already taken or the game has been won
  if (board[index] || checkForWinner()) {
    return;
  }

  // Mark the button with the current player's symbol
  board[index] = currentPlayer;
  button.textContent = currentPlayer;

  // Check for a winner after the move
  if (checkForWinner()) {
    setTimeout(() => {
      showModal(`${currentPlayer} wins!`); // Announce the correct winner
    }, 100);
  } else if (board.every(cell => cell)) {
    // Check for a draw
    setTimeout(() => {
      showModal('It\'s a draw!');
    }, 100);
  } else {
    // Switch to the other player and update the turn indicator
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
  }
}

// Function to check for a winner
function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Function to reset the game
function resetGame() {
  board.fill(null);
  document.querySelectorAll('.xo').forEach(button => {
    button.textContent = ''; // Clear the Tic Tac Toe button text
  });
  currentPlayer = 'X'; // Reset to player X
  updateTurnIndicator(); // Update the turn indicator to show Player X's turn
}

// Function to show a custom modal
function showModal(message) {
  const modal = document.getElementById('gameModal');
  const modalMessage = document.getElementById('modalMessage');
  const playAgainButton = document.getElementById('playAgainButton');

  modalMessage.textContent = message; // Set the winner or draw message
  modal.style.display = 'block'; // Show the modal

  playAgainButton.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
    resetGame(); // Reset the game
  };
}

// Attach event listeners to the buttons
document.querySelectorAll('.xo').forEach(button => {
  button.addEventListener('click', markTheSpot);
});

function changeTheme(themeFile) {
  const stylesheetLink = document.getElementById('stylesheet');
  stylesheetLink.href = themeFile;
}

// Add event listener to the reset button
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initialize the turn indicator on page load
updateTurnIndicator();


//to control bgm and sounds
document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const tileClick = document.getElementById('tileClick');
  const music = document.getElementById('backgroundMusic');

  let isMusicPlaying = localStorage.getItem('isMusicPlaying') === 'true';
  let areSoundEffectsEnabled = localStorage.getItem('areSoundEffectsEnabled') === 'true';

  function playClickSound() {
      if (areSoundEffectsEnabled) {
          clickSound.play().catch(e => console.error('Click sound play error:', e));
      }
  }

  function playTileClick() {
      if (areSoundEffectsEnabled) {
          tileClick.play().catch(e => console.error('Tile click sound play error:', e));
      }
  }

  function applyMusicState() {
      if (isMusicPlaying) {
          music.play().catch(e => console.error('Music play error:', e));
      } else {
          music.pause();
      }
  }

  applyMusicState();

  // Play click sound when dropdown item is selected
  document.getElementById('themeSelector').addEventListener('change', () => {
      playClickSound();
  });

  // Play click sound when a game tile is chosen
  document.querySelectorAll('.xo').forEach(tile => {
      tile.addEventListener('click', () => {
          playTileClick();
      });
  });

  // Play click sound for reset and play again buttons
  document.getElementById('resetButton').addEventListener('click', () => {
      playClickSound();
  });

  document.getElementById('playAgainButton').addEventListener('click', () => {
      playClickSound();
  });
});
