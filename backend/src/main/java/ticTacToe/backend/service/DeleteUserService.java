package ticTacToe.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ticTacToe.backend.repository.PlayerRepo;

@Service
public class DeleteUserService {
    
    @Autowired
    PlayerRepo repo;

    public void deletePlayer(String userName){
        repo.deleteById(userName);
    }
}
