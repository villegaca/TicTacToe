package ticTacToe.repository;

import ticTacToe.models.Roles;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RolesRepository extends MongoRepository<Roles, String>{
    Optional<Roles> findByRoleName(String roleName);
}
