import React from 'react';
import SquareButton from '../../components/UI/SquareButton/SquareButton';
import './GamePage.css';

function GamePage(){
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