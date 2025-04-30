package ticTacToe.backend.dto;

import java.util.List;

public class BoardRequest {
    private List<String> board;

    public char[] getBoard() {
        char[] result = new char[board.size()];
        for (int i = 0; i < board.size(); i++) {
            String cell = board.get(i);
            result[i] = (cell != null && !cell.isEmpty()) ? cell.charAt(0) : ' ';
        }
        return result;
    }

    // public List<String> getBoard() {
    //     return board;
    // }

    public void setBoard(List<String> board) {
        this.board = board;
    }
    // private char[] board;

    // public char[] getBoard(){
    //     return board;
    // }

    // public void setBoard(char[] board){
    //     this.board = board;
    // }
}
