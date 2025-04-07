package ticTacToe.backend.service;

import org.springframework.stereotype.Service;

@Service
public class MinMaxService {
    public static int findBestMove(char[] board) {
        int bestMove = -1;
        int bestValue = Integer.MIN_VALUE;

        for (int i = 0; i < board.length; i++) {
            if (board[i] == ' ') {
                board[i] = 'O'; // Try bot move
                int moveValue = minimax(board, 0, false);
                board[i] = ' '; // Undo move

                if (moveValue > bestValue) {
                    bestValue = moveValue;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    private static int minimax(char[] board, int depth, boolean isMaximizing) {
        int score = evaluate(board);
        if (score == 10) return score - depth;
        if (score == -10) return score + depth;
        if (isBoardFull(board)) return 0;

        if (isMaximizing) {
            int best = Integer.MIN_VALUE;
            for (int i = 0; i < board.length; i++) {
                if (board[i] == ' ') {
                    board[i] = 'O';
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = ' ';
                }
            }
            return best;
        } else {
            int best = Integer.MAX_VALUE;
            for (int i = 0; i < board.length; i++) {
                if (board[i] == ' ') {
                    board[i] = 'X';
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = ' ';
                }
            }
            return best;
        }
    }

    private static boolean isBoardFull(char[] board) {
        for (char cell : board) {
            if (cell == ' ') return false;
        }
        return true;
    }

    private static int evaluate(char[] board) {
        int[][] winConditions = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // Rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // Columns
            {0, 4, 8}, {2, 4, 6}             // Diagonals
        };

        for (int[] condition : winConditions) {
            if (board[condition[0]] == board[condition[1]] &&
                board[condition[1]] == board[condition[2]] &&
                board[condition[0]] != ' ') {
                return (board[condition[0]] == 'O') ? 10 : -10;
            }
        }
        return 0;
    }
}
