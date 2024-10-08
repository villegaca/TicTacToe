import { React, useState } from 'react';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import './SignUpPage.css';

function SignUpPage (){
    const signUpMsg = "Sign Up";
    const createAccountMsg = "Create Your Account";
    const userNameText = "UserName";
    const emailText = "Email";
    const passwordText = "Password";
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className = 'main'>
            <div className='sign-in-title'>
                <p className='sign-up-text'> <strong>{ signUpMsg }</strong> </p>
                <p className='create-account-text'> { createAccountMsg }</p> 
            </div>

            <div className='input-boxes'>
                <LoginTextBox
                    type = "text"
                    value = { userName }
                    onChange = {setUserName}
                    placeHolder = {userNameText} 
                >

                </LoginTextBox>

                <LoginTextBox
                    type = "text"
                    value = { email }
                    onChange = {setEmail}
                    placeHolder = {emailText} 
                >

                </LoginTextBox>

                <LoginTextBox
                    type = "password"
                    value = { password }
                    onChange = {setPassword}
                    placeHolder = {passwordText} 
                >

                </LoginTextBox>

            </div>

            <div className='sign-up-button'>
                <button className='sign-up-button-text'> { signUpMsg} </button>
            </div>
        </div>
    )
}

export default SignUpPage;