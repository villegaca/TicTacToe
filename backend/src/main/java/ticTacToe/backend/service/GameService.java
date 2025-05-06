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
