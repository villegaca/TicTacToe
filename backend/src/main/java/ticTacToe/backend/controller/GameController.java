package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import ticTacToe.backend.service.GameService;

@Controller
public class GameController {

    @Autowired
    private GameService gameService;
    
    @PostMapping("/addWin")
    public ResponseEntity<String> recordWin(){
        boolean success = gameService.addWin();

        if(success){
            return ResponseEntity.ok("Win Recorded");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        }
    }

    @PostMapping("/addLoss")
    public ResponseEntity<String> recordLoss(){
        boolean success = gameService.recordLoss();

        if(success){
            return ResponseEntity.ok("Loss recorded");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        }
    }
}
