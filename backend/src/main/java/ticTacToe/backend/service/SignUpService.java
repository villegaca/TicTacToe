package ticTacToe.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.repository.PlayerRepo;

@Service
public class SignUpService {
   
    @Autowired
    private PlayerRepo repo;

    public void storeInfo(PlayerModel player){
        repo.save(player);
    }
}
