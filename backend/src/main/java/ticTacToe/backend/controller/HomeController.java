package ticTacToe.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import ticTacToe.backend.models.PlayerModel;
import ticTacToe.backend.service.HomeService;

@Controller
public class HomeController {
    @Autowired
    private HomeService service;

    @GetMapping("/getStats")
    public ResponseEntity<String> getWinLoss(){
        return service.getWinLoss();
    }
}
