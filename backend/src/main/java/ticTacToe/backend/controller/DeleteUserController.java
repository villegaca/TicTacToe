package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ticTacToe.backend.service.DeleteUserService;

@RestController
public class DeleteUserController {

    @Autowired
    private DeleteUserService service;
    
    @DeleteMapping("/delete/{userName}")
    public ResponseEntity<String> deleteUser(@PathVariable String userName){
        try{
            service.deletePlayer(userName);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
