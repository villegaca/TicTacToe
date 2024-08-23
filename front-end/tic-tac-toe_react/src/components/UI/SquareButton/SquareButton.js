import React from 'react';
import './SquareButton.css';

function SquareButton(prop) {
    return (
        <button className = "square"> {prop.value} </button>
    )
}

export default SquareButton;