package ticTacToe.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.models.UserPrincipal;
import ticTacToe.backend.repository.PlayerRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    
    @Autowired
    private PlayerRepo playerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        PlayerModel playerModel = playerRepo.findByUserName(username);

            if(playerModel == null) {
                System.out.println("User Not Found");
                throw new UsernameNotFoundException("user not found");
            }
            
        
        return new UserPrincipal(playerModel);
    }
}
