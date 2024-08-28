package ticTacToe.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;

import ticTacToe.dto.SignUpDto;
import ticTacToe.models.Roles;
import ticTacToe.models.UserDocument;
import ticTacToe.repository.RolesRepository;
import ticTacToe.repository.UserRepository;

@RestController
public class SignUpController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RolesRepository rolesRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SignUpController(AuthenticationManager authenticationManager, UserRepository userRepository, RolesRepository rolesRepository, PasswordEncoder passwordEncoder){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto){
        if(userRepository.existsByUserName(signUpDto.getUsername())){
            return new ResponseEntity<>("UserName is taken!", HttpStatus.BAD_REQUEST);
        }

        UserDocument user = new UserDocument();
        user.setUserName(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassWord(passwordEncoder.encode(signUpDto.getPassword()));

        Roles roles = rolesRepository.findByRoleName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User has registered", HttpStatus.OK);
    }
}
