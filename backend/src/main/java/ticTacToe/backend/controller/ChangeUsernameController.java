package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.service.ChangeNameService;

@RestController
public class ChangeUsernameController {
    
    @Autowired
    private ChangeNameService service;

    @PostMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(){
        return new ResponseEntity(HttpStatus.OK);
    }
}
