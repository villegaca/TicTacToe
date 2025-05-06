import React from "react";
import "./PasswordInput.css";

const PasswordInput = ({value, onChange}) => (
    <div className="password-input">
        <input
            type = "password"
            value = {value}
            onChange = {onChange}
            placeholder = "Enter Password"
        />
    </div>
);

export default PasswordInput;