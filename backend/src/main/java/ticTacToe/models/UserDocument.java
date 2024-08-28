package ticTacToe.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
@NoArgsConstructor
public class UserDocument {
    @Id
    private String id;
    private String userName;
    private String email;
    private String passWord;

    @DBRef
    private List<Roles> roles = new ArrayList<>();
}
