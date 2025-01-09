package ticTacToe.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ticTacToe.models.PlayerModel;
import ticTacToe.repository.PlayerRepo;

@Service
public class GameService {

    @Autowired
    private PlayerRepo repo;

    public ResponseEntity<Map<String, String>> initializeGame(){
        String playerSymbol = Math.random() < 0.5 ? "X":"O";
        String botSymbol = playerSymbol.equals("X") ? "O" : "X";
        String firstTurn = Math.random() < 0.5 ? "player" : "bot";

        return ResponseEntity.ok(Map.of(
            "playerSymbol", playerSymbol,
            "botSymbol", botSymbol,
            "firstTurn", firstTurn

            //if bot goes first, enter turn decision here for the bot
        ));
    }

    //min-max
    public String calculateBestMove(){

        return null;
    }

    //determine if game over
    public boolean isGameOver(){

        return false;
    }

    
    
}
