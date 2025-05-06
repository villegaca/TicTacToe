import React from "react";
import './DeleteAccountButton.css';

function DeleteAccountButton({ onClick }) {
    return (
        <button className="delete-button" onClick = { onClick }>Delete Account</button>

    );
}

export default DeleteAccountButton;