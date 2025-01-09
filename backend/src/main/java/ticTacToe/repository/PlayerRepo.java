package ticTacToe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import ticTacToe.models.PlayerModel;


public interface PlayerRepo extends MongoRepository<PlayerModel, String> {

    @Query(value = "{ '_id': ?0 }", fields = "{ 'wins ':1, 'losses': 1}")
    PlayerModel getWinsAndLosses(String userName);
    
}
