package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.service.loginService;

@RestController
public class LoginController {
    
    @Autowired
    private loginService service;

    @GetMapping("/")
    public String greet(){
        return "hello";
    }

    @PostMapping("/attemptLogin")
    public ResponseEntity<String> login(@RequestBody PlayerModel playerModel){
        String userName = playerModel.getUserName();
        String passwordData = playerModel.getPassword();

        if (!service.accountExist(userName)){
            // code is 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // use code 401 if password is bad
        if(!passwordData.equals(service.getPasswordByUsername(userName))){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        //code is 200 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
