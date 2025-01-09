import {React, useState, useEffect } from 'react';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import './GamePage.css';

/*
set player to their symbol randomly

determine who goes first




*/
function GamePage(){
    let playerMark = " ";
    let computerMark = " ";
    const [currentPlayer, setCurrentPlayer] = useState(" ");
    const marks = ["X", "O"];
    const randomIndex = Math.floor(Math.random() * marks.length);
    const playerFirstMsg = "You Go First!";
    const computerFirstMsg = "You Go Second";

    // assign X and O to players
    // function assignMark(){
    //     playerMark = marks[randomIndex];

    //     if(playerMark == marks[0]){
    //         computerMark = marks[1];
    //     } else {
    //         computerMark = marks[0];
    //     }
    // }

    //***********MUST ADD THIS TO A MSG IN RETURN SO THE PLAYER CAN SEE THIS MESSAGE */
    //***********also must figure out a way to allow either player to go first based on who goes first */
    // function whoGoesFirst(){
    //     setCurrentPlayer(marks[randomIndex]);

    //     if(currentPlayer == playerMark){
    //         console.log(playerFirstMsg);
    //     } else {
    //         console.log(computerFirstMsg);
    //     }
    // }
    // calls the functions that determine the marks and who goes first
    // useEffect(() => {
    //     assignMark();
    //     whoGoesFirst();
    // }, []);

    // will handle each players turn based on a swtich logic
    // function handleTurns(){
    //     switch(currentPlayer){
    //         case playerMark:

    //         case computerMark:
    //     }
    // }

    // called the function that handles each turn whenever currentPlayer is changed
    // useEffect(()=> {
    //     handleTurns();
    // }, [currentPlayer]);

    return (
        <div className='gamePage'>
            <div>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
            </div>
            <div>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
            </div>
            <div>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
                <SquareButton value = "X"/>
            </div>
        </div>
        
    );
}

export default GamePage;