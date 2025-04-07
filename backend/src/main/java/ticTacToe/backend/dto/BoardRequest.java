package ticTacToe.backend.dto;

public class BoardRequest {
    private char[] board;

    public char[] getBoard(){
        return board;
    }

    public void setBoard(char[] board){
        this.board = board;
    }
}
