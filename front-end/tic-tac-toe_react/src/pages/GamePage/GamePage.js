import {React, useState, useEffect, useRef } from 'react';
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
    const [beforeGameMsg, setBeforeGameMsg] = useState("");
    const marks = ["X", "O"];
    const randomIndex = Math.floor(Math.random() * marks.length);
    const playerFirstMsg = "You Go First!";
    const computerFirstMsg = "You Go Second";
    //useRef to stop useEffect from running twice
    const initialized = useRef(false);
    const [msgVisible, setMsgVisible] = useState(false);
    const [marksAssigned, setMarksAssigned] = useState(false);
    const [isComputerFirst, setIsComputerFirst] = useState(false);
    const [didGameStart, setDidGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [winningCombo, setWinningCombo] = useState(null);
    const [showLine, setShowLine] = useState(false);


    // assign X and O to players
    function assignMark(){
        const randomIndex = Math.floor(Math.random() * marks.length);
        const computerIndex = 1 - randomIndex;

        const chosenPlayerMark = marks[randomIndex];
        const chosenComputerMark = marks[computerIndex];

        setPlayerMark(chosenPlayerMark);
        setComputerMark(chosenComputerMark);

        showMessage(`You are ${chosenPlayerMark}`, () => {
            setMarksAssigned(true);
        }, 3000);
    };

    //***********MUST ADD THIS TO A MSG IN RETURN SO THE PLAYER CAN SEE THIS MESSAGE */
    //***********also must figure out a way to allow either player to go first based on who goes first */
    function whoGoesFirst(){
        const randomIndex = Math.floor(Math.random() * marks.length);
        const firstPlayer = marks[randomIndex];
        setCurrentPlayer(firstPlayer);
        console.log("starting player: ", firstPlayer);

        if(firstPlayer === computerMark){
            showMessage(computerFirstMsg);
            setIsComputerFirst(true);
            console.log(computerFirstMsg);
        }else {
            showMessage(playerFirstMsg);
        }
    };

    const handleClick = async (index) => {
        if(board[index] !== "" || !didGameStart || gameOver){
            return;
        }

        const newBoard = [...board];
        newBoard[index] = playerMark;
        setBoard(newBoard);
        
        const winner = checkForWin(newBoard);
        if(winner){
            setGameOver(true);
            setWinningCombo(winner.combination);
            return;
        }

        setCurrentPlayer(computerMark);

        try {
            const charBoard = newBoard.map(cell => cell === "" ? ' ' : cell);
            const response = await axios.post('http://localhost:8080/calculateMove', {board: charBoard});
            const computerMove = response.data.computerMove;

            if (computerMove !== -1){
                const botBoard = [...newBoard];
                botBoard[computerMove] = computerMark;

                const botWinner = checkForWin(botBoard);
                if(botWinner){
                    setGameOver(true);
                    setWinningCombo(botWinner.combination);
                    setBoard(botBoard);
                    return;
                }

                setTimeout(() => {
                    setBoard(botBoard);
                }, 300);    
            }
        }catch(error){
            console.error("error fetching computer move: ", error)
        }
    };

    const botFirstMove = async () => {
        console.log("Bot making first move...");

        try {
            const emptyBoard = Array(9).fill("");
            const response = await axios.post('http://localhost:8080/calculateMove', {board: emptyBoard});
            const computerMove = response.data.computerMove;

            if (computerMove !== -1){
                const newBoard = [...emptyBoard];
                newBoard[computerMove] = computerMark;

                const botWinner = checkForWin(newBoard);
                if (botWinner) {
                    setGameOver(true);
                    setWinningCombo(botWinner.combination);
                    showMessage(`${botWinner} wins!`);
                    setBoard(newBoard);
                    return; // End the game
                }

                setBoard(newBoard);
            }
        }catch(error){
            console.error("error fetching computer move: ", error)
        }
    };

    const checkForWin = (board) => {
        const winningCombination = [
            [0, 1, 2], // row 1
            [3, 4, 5], // row 2
            [6, 7, 8], // row 3
            [0, 3, 6], // column 1
            [1, 4, 7], // column 2
            [2, 5, 8], // column 3
            [0, 4, 8], // diagonal 1
            [2, 4, 6], // diagonal 2
        ];

        for(let combination of winningCombination){
            const [a, b, c] = combination;
            if(board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
                return { winner: board[a], combination };
            }
        }
        return null;
    };

    const showMessage = (text, onComplete, duration = 3000) => {
        setBeforeGameMsg(text);
        setMsgVisible(true);

        setTimeout(() => {
            setMsgVisible(false);

            setTimeout(() => {
                setBeforeGameMsg("");
                if (typeof onComplete === 'function'){
                    onComplete();
                } 
            }, 500);
        }, duration);
    };

    useEffect(() => {
        if(!initialized.current){
            assignMark();
            initialized.current = true;
        }
        
    }, []);
    
    useEffect(() => {
        if (marksAssigned && computerMark && playerMark) {
            whoGoesFirst();
        }
    }, [marksAssigned, computerMark, playerMark]);

    useEffect(() => {
        if(winningCombo){
            setTimeout(() => {
                setShowLine(true);
            }, 50)
        }
    }, [winningCombo]);
    

    const startGame = () => {
        setDidGameStart(true);
        if(isComputerFirst){
            botFirstMove();
        }
    };

    return (
        <div className='gamePage'>
            <div className='game-container'>
                <div className='before-game-container'>
                    <div className={`before-start-messages ${msgVisible ? 'show' : ''}`}>
                        {beforeGameMsg}
                    </div>
                    {/*<div className={`before-start-messages ${beforeGameMsg ? 'show' : ''}`}>
                        {beforeGameMsg && <span>{beforeGameMsg}</span>}
                    </div>
                    
                    {/*
                    <div className='before-game-container'>
                        {beforeGameMsg && <div className='before-start-messages'>{beforeGameMsg}</div>}
                    </div>
                    */}
                    
                </div>
                
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

                    {winningCombo && ( 
                        <div className = {`win-line win-line-${winningCombo.join("-")} ${showLine ? "show" : ""}`}/>
                    )}
                </div>

                <div className='start-game-button-container'>
                    <button className = 'start-game-button' onClick={startGame}>Start Game</button>
                </div>
            </div>
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