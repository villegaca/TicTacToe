package ticTacToe.backend.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

    @Autowired
    private MongoTemplate mongoTemplate;

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

    public ResponseEntity<String> updateUsername(String newUsername){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (newUsername == null || newUsername.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New Username can't be empty");
        }

        if (accountExist(newUsername)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is taken already");
        }
         
        //PlayerModel player = repo.findByUserName(username);

        Query query = new Query(Criteria.where("_id").is(username));
        Update update = new Update().set("_id", newUsername).set("userName", newUsername);

        PlayerModel player = mongoTemplate.findOne(query, PlayerModel.class);

        
        if(player != null){
            player.setUserName(newUsername);
            mongoTemplate.remove(query, PlayerModel.class);
            mongoTemplate.save(player);
            String newToken = jwtService.generateToken(newUsername);

            return ResponseEntity.ok(newToken);
        }
            // player.setUserName(newUsername);
            // repo.save(player);
            //return ResponseEntity.ok("New Username Saved");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        
    }

    public ResponseEntity<String> deleteAccount(String password){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if(username == null || username.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        if(!checkPassword(password)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong Password");
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

    public boolean checkPassword(String password){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        PlayerModel player = repo.findByUserName(username);

        if(username.isEmpty()){
            return false;
        }

        return encoder.matches(password, player.getPassword());
    }

    public boolean accountExist(String username){
        return repo.existsById(username);
    }

    // public String getPasswordByUsername(String id){
    //     PlayerModel player = repo.findByUserName(id);
    //     return player.getPassword();
    // }
   
}
