import { React, useState } from 'react';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import { useNavigate } from "react-router-dom";
import './SignUpPage.css';
import axios from '../../api/AxiosConfig';

function SignUpPage (){
    const signUpMsg = "Sign Up";
    const createAccountMsg = "Create Your Account";
    const userNameText = "UserName";
    const emailText = "Email";
    const passwordText = "Password";
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        wins: 0,
        losses: 0
    });
    // const [userName, setUserName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post("'http://localhost:8080/signUp'", formData);
            console.log('Response: ', response.data);
            navigate("/home");
        }catch(error){
            console.error("Error Signing In: ", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className = 'main'>
            <div className='sign-in-title'>
                <p className='sign-up-text'> <strong>{ signUpMsg }</strong> </p>
                <p className='create-account-text'> { createAccountMsg }</p> 
            </div>

            <div className='input-boxes'>
                <LoginTextBox
                    type = "text"
                    name = "userName"
                    value = { formData.userName }
                    onChange = {handleInputChange}
                    placeHolder = {userNameText} 
                >

                </LoginTextBox>

                <LoginTextBox
                    type = "text"
                    name = "email"
                    value = { formData.email }
                    onChange = {handleInputChange}
                    placeHolder = {emailText} 
                >

                </LoginTextBox>

                <LoginTextBox
                    type = "password"
                    name = "password"
                    value = { formData.password }
                    onChange = {handleInputChange}
                    placeHolder = {passwordText} 
                >

                </LoginTextBox>

            </div>

            <div className='sign-up-button'>
                <button className='sign-up-button-text' onClick = { handleSignUp }> { signUpMsg } </button>
            </div>
        </div>
    )
}

export default SignUpPage;