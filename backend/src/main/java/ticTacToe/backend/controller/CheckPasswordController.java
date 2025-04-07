package ticTacToe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ticTacToe.backend.service.CheckPasswordService;

@Controller
public class CheckPasswordController {
    
    @Autowired
    private CheckPasswordService service;

    
}
