import {React, useState } from 'react';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from "../../api/AxiosConfig";

function LoginPage(){
    const welcomeMsg = "Welcome";
    const userNameText = "UserName";
    const passwordText = "Password";
    const noAccountText = "Don't Have An Account? ";
    const signUpText = "Sign Up Here!";
    const accountError = "No Account Exists";
    const passwordError = "Invalid Credentials";
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    });
    const [error404, setError404] = useState(false);
    const [error401, setError401] = useState(false);
    const navigate = useNavigate();

    const loginHandler = async () => {
        
        try{
            const response = await axios.post('http://localhost:8080/attemptLogin', loginData);
            console.log('Response: ', response.data);
    
            setError401(false);
            setError404(false);
    
            navigate("/home");
        }catch (error){
            if(error.response.status === 404){
                setError404(true);
                setError401(false);
            } else if (error.response.status === 401){
                setError401(true);
                setError404(false);
            }
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        
        <div className = "main">
            <h1 className = "welcome-title">{welcomeMsg}</h1>

            {(error404 || error401) && (
            <div className = "error-message">{ error404?accountError : error401?passwordError : "" }</div>
            )}  
            
            <div className='input-boxes'>
                <LoginTextBox 
                    type = "text" 
                    name = "userName"
                    value = { loginData.userName } 
                    onChange = {handleInputChange} 
                    placeHolder = {userNameText}>
                </LoginTextBox>

                <LoginTextBox 
                    type = "password" 
                    name = "password"
                    value = { loginData.password } 
                    onChange = {handleInputChange} 
                    placeHolder = {passwordText}>
                </LoginTextBox> 

            </div>

            <div className='login-button-container'>
                <button className='login-button' onClick = { loginHandler }>Log in</button>
            </div>

            <div className = 'sign-up-message'>
                <div>
                    <p className = "no-account-text">{noAccountText}</p>
                </div>
                <div>
                    <button className='sign-up-button' onClick={() => navigate("/signUp")}>{signUpText}</button>
                </div>
            </div>  
        </div>
        
    )
}

export default LoginPage;