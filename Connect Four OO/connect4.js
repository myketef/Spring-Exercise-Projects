class Player {
  constructor(color, name) {
    this.color = color;
    this.name = name;
  }
}

class Game {
  constructor(height = 6, width = 7) {
    this.height = height;
    this.width = width;
    this.board = []; // array of rows
    this.currPlayer = null; // instance of Player
    this.players = [];
    this.gameOver = false;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    this.board = Array.from({ length: this.height }, () => Array(this.width).fill(null));
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // clear board

    // Make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // Make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    this.gameOver = true;
  }

  handleClick(evt) {
    if (this.gameOver) return;

    // Get x from ID of clicked cell
    const x = +evt.target.id;

    // Get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // Place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // Check for win
    if (this.checkForWin()) {
      return this.endGame(`${this.currPlayer.name} won!`);
    }

    // Check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // Switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  checkForWin() {
    const _win = cells => cells.every(
      ([y, x]) =>
        y >= 0 && y < this.height && x >= 0 && x < this.width &&
        this.board[y][x] === this.currPlayer
    );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  startNewGame(p1Color, p2Color) {
    this.players = [
      new Player(p1Color, 'Player 1'),
      new Player(p2Color, 'Player 2')
    ];
    this.currPlayer = this.players[0];
    this.gameOver = false;
    this.makeBoard();
    this.makeHtmlBoard();
  }
}

document.getElementById('start-btn').addEventListener('click', () => {
  const p1Color = document.getElementById('p1-color').value;
  const p2Color = document.getElementById('p2-color').value;
  const game = new Game(6, 7);
  game.startNewGame(p1Color, p2Color);
});
