import {React, useState } from 'react';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
    const welcomeMsg = "Welcome";
    const userNameText = "UserName";
    const passwordText = "Password";
    const noAccountText = "Don't Have An Account? ";
    const signUpText = "Sign Up Here!";
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        
        <div className = "main">
            <h1 className = "welcome-title">{welcomeMsg}</h1>
            
            <div className='input-boxes'>
                <LoginTextBox type = "text" value = { userName } onChange = {setUserName} placeHolder = {userNameText}>

                </LoginTextBox>

                <LoginTextBox type = "password" value = { password } onChange = {setPassword} placeHolder = {passwordText}>

                </LoginTextBox> 

            </div>

            <div className='login-button-container'>
                <button className='login-button'>Log in</button>
            </div>

            <div className = 'sign-up-message'>
                <div>
                    <p className = "no-account-text">{noAccountText}</p>
                </div>
                <div>
                    <button className='sign-up-button' onClick={() => navigate('/signUp')}>{signUpText}</button>
                </div>
            </div>  
        </div>
        
    )
}

export default LoginPage;