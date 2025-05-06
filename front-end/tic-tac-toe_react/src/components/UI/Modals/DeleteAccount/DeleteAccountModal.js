import React from "react";
import PasswordInput from "../../PasswordInput/PasswordInput";
import "./DeleteAccountModal.css";

function DeleteAccountModal( {password, onPasswordChange, onConfirm, onCancel, error }) {
    let areYouSure = "Are you sure you want to delete your account?";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p> { areYouSure }</p>
                {error && <div className="error-message modal-error">{error}</div>}
                <PasswordInput value = {password} onChange={onPasswordChange}/>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Yes</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>

                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;