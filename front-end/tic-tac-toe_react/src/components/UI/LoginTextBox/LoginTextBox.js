import React from "react";
import './LoginTextBox.css';

function LoginTextBox(props){
    return (
        <div className="text-box">
            <form>
                <input
                    type = {props.type}
                    name = {props.name}
                    value = {props.value}
                    autoComplete="off"
                    //onChange = {(e) => props.onChange(e.target.value)}
                    onChange={props.onChange}
                />
                <span className = {props.value.length ===0? "": "fill"}> {props.placeHolder}</span>
            </form>
        </div>
    )
}

export default LoginTextBox;