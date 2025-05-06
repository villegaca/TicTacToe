package ticTacToe.backend.models;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

    private PlayerModel playerModel;

    public UserPrincipal(PlayerModel playerModel2) {
        this.playerModel = playerModel2;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return playerModel.getPassword();
    }

    @Override
    public String getUsername() {
        return playerModel.getUserName();
    }
    
}
