package ticTacToe.backend.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Getter;
import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.repository.PlayerRepo;

@Service
public class loginService {
    private String noAccount = "Account Does Not Exist";
    private String wrongPassowrd = "Invalid Password";
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;
    
    @Autowired
    private PlayerRepo repo;

    public ResponseEntity<String> verify(PlayerModel user){
        try {
            String token = "";
            Authentication authentication = 
                authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                user.getUserName(), user.getPassword())
            );

            if(authentication.isAuthenticated()){
                token = jwtService.generateToken(user.getUserName());
                //return ResponseEntity.ok(token);
            }

            return ResponseEntity.ok(token);

        } catch (UsernameNotFoundException e) {
            // 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(noAccount);
        } catch (BadCredentialsException e){
            // 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(wrongPassowrd);
        } catch (Exception e){
            e.printStackTrace();
            // unexpected server failure
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected failure");
        }

        // if(!accountExist(user.getUserName())){
        //     return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account Does Not Exist");
        // }

        



        // return "Failure";
    }

    public ResponseEntity<String> storeInfo(PlayerModel player){
        String token = "";
        //Map<String, String> response = new HashMap<>();

        if(accountExist(player.getUserName())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Account Already Exists");
        }

        player.setPassword(passwordEncoder.encode(player.getPassword()));
        
        repo.save(player);
        token = jwtService.generateToken(player.getUserName());

        //response.put("token", token);
        
        return ResponseEntity.ok(token);
        
    }

    public ResponseEntity<String> deleteAccount(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if(username == null || username.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        try {
            PlayerModel player = repo.findByUserName(username);
            if(player != null){
                repo.delete(player);
                return ResponseEntity.ok("Account deleted");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting account");
        }
    }

    public boolean accountExist(String username){
        return repo.existsById(username);
    }

    // public String getPasswordByUsername(String id){
    //     PlayerModel player = repo.findByUserName(id);
    //     return player.getPassword();
    // }
   
}
