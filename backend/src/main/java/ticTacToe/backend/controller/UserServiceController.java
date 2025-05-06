package ticTacToe.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ticTacToe.backend.dto.PasswordVerificationRequest;
import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.service.JWTService;
import ticTacToe.backend.service.UserService;

@RestController
public class UserServiceController {
    
    @Autowired
    private UserService service;

    @PostMapping("/attemptLogin")
    public ResponseEntity<String> attemptLogin(@RequestBody PlayerModel playerModel){
        return service.verify(playerModel);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody PlayerModel player){
        return service.storeInfo(player);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRequest(@RequestBody PasswordVerificationRequest request){
        return service.deleteAccount(request.getPassword());
    }

    @PostMapping("/verifyPassword")
    public ResponseEntity<String> verifyPassword (@RequestBody PasswordVerificationRequest request){
        if(service.checkPassword(request.getPassword())){
            return ResponseEntity.ok("Password is correct");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Password");
        }
    }

    @PostMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(@RequestBody PasswordVerificationRequest username) {
        return service.updateUsername(username.getUsername());
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody PasswordVerificationRequest request) {
        return service.updatePassword(request.getPassword());
    }
}


