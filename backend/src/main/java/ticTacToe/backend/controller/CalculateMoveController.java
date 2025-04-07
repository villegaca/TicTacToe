package ticTacToe.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ticTacToe.backend.dto.BoardRequest;
import ticTacToe.backend.service.MinMaxService;

@Controller
public class CalculateMoveController {

    @Autowired
    private MinMaxService minMax;
    
    @PostMapping("/calculateMove")
    public ResponseEntity<Map<String, Integer>> determineMove(@RequestBody BoardRequest boardRequest){
        char[] board = boardRequest.getBoard();
        int computerMove = minMax.findBestMove(board);

        Map<String, Integer> response = new HashMap<>();
        response.put("computerMove", computerMove);
        
        return ResponseEntity.ok(response);
    }
}
