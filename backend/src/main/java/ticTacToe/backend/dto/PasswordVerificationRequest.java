package ticTacToe.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordVerificationRequest {
    private String username;
    private String password;
}
