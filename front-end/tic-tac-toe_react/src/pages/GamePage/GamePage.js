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

        //console.log("Player mark:", chosenPlayerMark);  // Log to check player mark
        //console.log("Computer mark:", chosenComputerMark);  // Log to check computer mark

        // setTimeout(() => {
        //     whoGoesFirst();
        // }, 3500);
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
            botFirstMove();
            console.log(computerFirstMsg);
        }else {
            showMessage(playerFirstMsg);
        }
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
                const botBoard = [...newBoard];
                botBoard[computerMove] = computerMark;
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
                setBoard(newBoard);
            }
        }catch(error){
            console.error("error fetching computer move: ", error)
        }
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
    

    const startGame = () => {
        assignMark(); // Assign marks to player and computer
        whoGoesFirst(); // Decide who goes first and update the state accordingly
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