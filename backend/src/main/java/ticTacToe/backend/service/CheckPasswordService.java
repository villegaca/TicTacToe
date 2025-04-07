package ticTacToe.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ticTacToe.backend.repository.PlayerRepo;

@Service
public class CheckPasswordService {
    
    @Autowired
    private PlayerRepo repo;

    public void checkPassword(String username, String password){
        
    }
}
