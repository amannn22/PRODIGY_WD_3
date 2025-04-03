class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells = document.querySelectorAll('.cell');
        this.status = document.querySelector('.status');
        this.resetButton = document.getElementById('resetButton');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        
        if (this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add(this.currentPlayer.toLowerCase());
            
            if (this.checkWin()) {
                this.endGame(`Player ${this.currentPlayer} Wins!`);
                this.highlightWinningCells();
            } else if (this.checkDraw()) {
                this.endGame("It's a Draw!");
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.updateStatus();
            }
        }
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningCombinations.forEach(combination => {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    this.cells[index].classList.add('winner');
                });
            }
        });
    }
    
    endGame(message) {
        this.status.textContent = message;
        this.gameActive = false;
    }
    
    updateStatus() {
        this.status.textContent = `Player ${this.currentPlayer}'s Turn`;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });
        
        this.updateStatus();
    }
}

// Initialize the game
new TicTacToe();