package ticTacToe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ticTacToe.models.PlayerModel;
import ticTacToe.repository.PlayerRepo;

@Service
public class HomePageService {
    
    @Autowired
    private PlayerRepo repo;

    public PlayerModel getUserInfo(String userName){
        return repo.findById(userName).orElse(new PlayerModel());
    }

    public PlayerModel getWinsAndLosses (String userName){
        return repo.getWinsAndLosses(userName);
    }
}
