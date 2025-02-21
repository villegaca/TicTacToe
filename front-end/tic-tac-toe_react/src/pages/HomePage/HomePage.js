import {React, useState, useEffect } from 'react';
import './HomePage.css';
import Header from "../../components/UI/Nav/Header/Header";
import { useNavigate } from 'react-router-dom';
import axios from "../../api/AxiosConfig";

function HomePage (){
    const [playerName, setPlayerName] = useState(" ");
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const helloText = 'Hello ';
    const playGameTxt = 'Play Game';
    const winLossRatio = 'Win/Loss Ratio';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8080/home');
                const data = response.data;
                
                setPlayerName(data.playerName);
                setWins(data.wins);
                setLosses(data.losses);

            } catch(error){
                console.error("Error fetching product: ", error);
            }
        };

        fetchProduct();
        
    }, []);

    return (
        <div className='main-home'>
            <Header/>
            <div className='title'>
                <p className='hello-text'> { helloText + playerName} </p>
                {/* <p className='pick-opponent-text'> { pickOpponentTxt }</p> */}
            </div>
            <div className= 'win-loss-container'>
                {/* <div className = 'ratio-container'> */}
                    <p className='ratio-text'> { winLossRatio } </p>
                    <p className = 'testing1'> INSERT REAL RATION HERE </p>

                    <div className = 'win-loss-numbers-container'>
                        <div className = 'win-number-container'>
                            <p className = 'win-number'> wins: {wins} </p>
                        </div>
                        <div className = 'loss-number-container'>
                            <p className = 'loss-number'> loss: {losses}</p>
                        </div>
                        
            </div>
                {/* </div> */}
            </div>

            {/* <div className = 'testing-container'>
                    <p className = 'testing1'> INSERT REAL RATION HERE </p>
                </div> */}
            
            

            <div className='opponent-select-button'>
                <button className='play-game-button' onClick = {() => navigate('/gamePage')}> { playGameTxt }</button>
                {/*<button className='practice' onClick= {() => navigate('/gamePage')}> { practiceTxt }</button>*/}
            </div>
        </div>
    )
}

export default HomePage;