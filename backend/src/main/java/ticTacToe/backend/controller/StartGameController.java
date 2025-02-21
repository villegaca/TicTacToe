package ticTacToe.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;

import ticTacToe.backend.service.GameService;

public class StartGameController {
    
    GameService service;

    @PostMapping("/start")
    public void startGame(){
        service.initializeGame();
    }

}
