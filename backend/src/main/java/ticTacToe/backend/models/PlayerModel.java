package ticTacToe.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("PlayerModel")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PlayerModel {
    @Id
    private String userName;
    private String email;
    private String password;
    private int wins;
    private int losses;
}



