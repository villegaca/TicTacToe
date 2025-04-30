package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.service.SignUpService;
import ticTacToe.backend.service.loginService;

@RestController
public class SignUpController {

    @Autowired
    private SignUpService service;

    @Autowired
    private loginService loginService;

    // @PostMapping("/signup")
    // public ResponseEntity<String> signUp(@RequestBody PlayerModel player){
    //     //if the account exist already
    //     if(loginService.accountExist(player.getUserName())){
    //         //409
    //         return new ResponseEntity(HttpStatus.CONFLICT);
    //     }
    //     service.storeInfo(player);
    //     return new ResponseEntity(HttpStatus.OK);
    // }
}
