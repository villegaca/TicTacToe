package ticTacToe.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.repository.PlayerRepo;

@Service
public class HomeService {
    
    @Autowired
    private PlayerRepo repo;

    public ResponseEntity<String> getWinLoss() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String response = "";

        //PlayerModel player = service.getWinLoss(username);
        PlayerModel player = repo.getWinsAndLosses(username);

        if(player != null){
            int winNumber = player.getWins();
            int lossNumber = player.getLosses();
            response = String.format("{\"wins\": %d, \"losses\": %d}", winNumber, lossNumber);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        //return repo.getWinsAndLosses(username);
    }
}
