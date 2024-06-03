// Tic Tac Toe
class Agent {
    constructor() {}

    // Minimax function
    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw
        var gameOver = board.gameOver();
        if (gameOver === 1) {
            return 1; // X wins
        } else if (gameOver === 2) {
            return -1; // O wins
        } else if (gameOver === 3) {
            return 0; // the game is a draw
        }

        // Recursive case - evaluate all possible moves and choose the best score
        if (isMaximizing) {
            var bestScore = -Infinity;
            for (var i = 1; i <= board.cells.length; i++) {
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i, 'X'); 
                    var score = this.minimax(newBoard, false);
                    bestScore = Math.max(bestScore, score);
                }
            }
            return bestScore;
        } else {
            var bestScore = Infinity;
            for (var i = 1; i <= board.cells.length; i++) {
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i, 'O'); 
                    var score = this.minimax(newBoard, true);
                    bestScore = Math.min(bestScore, score);
                }
            }
            return bestScore;
        }
    }

    // Select the best move
    selectMove(board) {
        var bestMove = null;
        var bestScore = board.playerOne ? -Infinity : Infinity;

        for (var i = 1; i <= board.cells.length; i++) {
            if (board.cellFree(i)) {
                var newBoard = board.clone();
                newBoard.move(i, board.playerOne ? 'X' : 'O'); // 'X' for playerOne, 'O' for playerTwo
                var score = this.minimax(newBoard, !board.playerOne);
                if (board.playerOne ? score > bestScore : score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }
}