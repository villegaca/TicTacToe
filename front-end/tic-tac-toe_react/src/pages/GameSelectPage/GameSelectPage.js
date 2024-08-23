import React from 'react';
import './GameSelectPage.css';

function GameSelectPage (){
    const helloText = 'Hello ';
    const pickOpponentTxt = 'Please Pick Your Opponent';
    const computerOpponentTxt = 'Computer';
    const humanOpponentTxt = 'Human';

    return (
        <div className='main'>
            <div className='title'>
                <p className='hello-text'> { helloText } </p>
                <p className='pick-opponent-text'> { pickOpponentTxt }</p>
            </div>

            <div className='opponent-select-button'>
                <button className='computer-button'> { computerOpponentTxt }</button>
                <button className='human-button'> { humanOpponentTxt }</button>
            </div>
        </div>
    )
}

export default GameSelectPage;