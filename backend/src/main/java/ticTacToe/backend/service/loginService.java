package ticTacToe.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.repository.PlayerRepo;

@Service
public class loginService {
    
    @Autowired
    private PlayerRepo repo;

    public boolean accountExist(String id){
        return repo.existsById(id);
    }

    public String getPasswordByUsername(String id){
        PlayerModel player = repo.findByUserName(id);
        return player.getPassword();
    }
   
}
