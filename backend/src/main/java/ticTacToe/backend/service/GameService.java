package ticTacToe.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.repository.PlayerRepo;

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

    public boolean addWin(){
        String username = getCurrentUsername();
        System.out.println("Authenticated user: " + username);

        PlayerModel player = repo.findByUserName(username);

        if(player == null){
            return false;
        }

        player.setWins(player.getWins() + 1);
        repo.save(player);
        return true;
    }

    public boolean recordLoss() {
        String username = getCurrentUsername();
        System.out.println("Authenticated user: " + username);

        PlayerModel player = repo.findByUserName(username);

        if(player == null){
            return false;
        }

        player.setLosses(player.getLosses() + 1);
        repo.save(player);
        return true;
    }

    public String getCurrentUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }



    
    
}
