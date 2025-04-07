import {React, useState, useEffect } from 'react';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import './GamePage.css';
import axios from "../../api/AxiosConfig";

/*
set player to their symbol randomly

determine who goes first




*/
function GamePage(){
    const [board, setBoard] = useState(Array(9).fill(""));
    const [playerMark, setPlayerMark] = useState("");
    const [computerMark, setComputerMark] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState(" ");
    const marks = ["X", "O"];
    const randomIndex = Math.floor(Math.random() * marks.length);
    const playerFirstMsg = "You Go First!";
    const computerFirstMsg = "You Go Second";

    // assign X and O to players
    function assignMark(){
        //const marks = ["X", "O"];
        //const randomIndex = Math.floor(Math.random() * marks.length);
        const chosenPlayerMark = marks[randomIndex];
        const chosenComputerMark = marks[1 - randomIndex];

        setPlayerMark(chosenPlayerMark);
        setComputerMark(chosenComputerMark);

        console.log("Player mark:", chosenPlayerMark);  // Log to check player mark
        console.log("Computer mark:", chosenComputerMark);  // Log to check computer mark
        // setPlayerMark(marks[randomIndex]);

        // if(playerMark === marks[0]){
        //     setComputerMark(marks[1]);
        // } else {
        //     setComputerMark(marks[0]);
        // }
    };

    //***********MUST ADD THIS TO A MSG IN RETURN SO THE PLAYER CAN SEE THIS MESSAGE */
    //***********also must figure out a way to allow either player to go first based on who goes first */
    function whoGoesFirst(){
        const firstPlayer = marks[randomIndex];
        setCurrentPlayer(firstPlayer);
        console.log("starting player: ", currentPlayer);

        if(currentPlayer === computerMark){
            botFirstMove();
            console.log(computerFirstMsg);
        }

        // if(currentPlayer === computerMark){
        //     console.log(playerFirstMsg);
        // } else {
        //     botFirstMove();
        //     console.log(computerFirstMsg);
        // }
    };

    const handleClick = async (index) => {
        if(board[index] !== ""){
            return;
        }

        const newBoard = [...board];
        newBoard[index] = playerMark;
        setBoard(newBoard);
        setCurrentPlayer(computerMark);

        try {
            const charBoard = newBoard.map(cell => cell === "" ? ' ' : cell);
            const response = await axios.post('http://localhost:8080/calculateMove', {board: charBoard});
            const computerMove = response.data.computerMove;

            if (computerMove !== -1){
                newBoard[computerMove] = computerMark;
                setBoard(newBoard);
                //setCurrentPlayer(playerMark);
            }
        }catch(error){
            console.error("error fetching computer move: ", error)
        }
    };

    const botFirstMove = async () => {
        console.log("Bot making first move...");
        //const charBoard = initialBoard.map(cell => cell === "" ? ' ' : cell);
        try {
            const emptyBoard = Array(9).fill("");
            const response = await axios.post('http://localhost:8080/calculateMove', {board: emptyBoard});
            const computerMove = response.data.computerMove;

            if (computerMove !== -1){
                const newBoard = [...emptyBoard];
                newBoard[computerMove] = computerMark;
                setBoard(newBoard);
                //setCurrentPlayer(playerMark);
            }
        }catch(error){
            console.error("error fetching computer move: ", error)
        }
    };
    // calls the functions that determine the marks and who goes first
    // useEffect(() => {
    //     assignMark();
    //     whoGoesFirst();
    // }, []);

    // useEffect(() => {
    //     // Assign random marks
    //     assignMark();
    //     // const marks = ["X", "O"];
    //     // const randomIndex = Math.floor(Math.random() * marks.length);
    //     // const chosenPlayerMark = marks[randomIndex];
    //     // const chosenComputerMark = marks[1 - randomIndex];

    //     // setPlayerMark(chosenPlayerMark);
    //     // setComputerMark(chosenComputerMark);
    //     // setCurrentPlayer(marks[randomIndex]);

    //     // console.log("Player mark:", chosenPlayerMark);  // Log to check player mark
    //     // console.log("Computer mark:", chosenComputerMark);  // Log to check computer mark
    // }, []);

    // After setting marks, decide who goes first
    // useEffect(() => {
    //     setCurrentPlayer(marks[randomIndex]);

    //     if (playerMark && computerMark && currentPlayer) {
    //         console.log("Current Player:", currentPlayer);  // Log to check current player
    //         if (currentPlayer === computerMark) {
    //             console.log("Bot going first, calling botFirstMove...");
    //             botFirstMove();  // Pass a copy of the board
    //         }
    //     }
    // }, [playerMark, computerMark, currentPlayer]);

    const startGame = () => {
        assignMark(); // Assign marks to player and computer
        whoGoesFirst(); // Decide who goes first and update the state accordingly
    };

    return (
        <div className='board'>
            {board.map((cell, index) => (
                <input
                    key= {index}
                    type= "text"
                    value= {cell}
                    readOnly
                    onClick= {()=> handleClick(index)}
                    className= "cell"
                />
            ))}
            <button onClick={startGame}>Start Game</button>
        </div>
        /*
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
        */
        
    );
}

export default GamePage;