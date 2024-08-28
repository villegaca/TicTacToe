package ticTacToe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import ticTacToe.models.UserDocument;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDocument, String>{
    Optional<UserDocument> findByUserName(String userName);
    boolean existsByUserName(String userName);
}
