import {React, useState} from 'react';
import './ChangeUsernamePage.css';
import { AnimatePresence, motion } from 'framer-motion';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import { useNavigate } from 'react-router-dom';
import { verifyPasswordCall, changeUsernameCall } from '../../api/UserServiceFunctions';
import axios from 'axios';
import axiosInstance from '../../api/AxiosConfig';

const ChangeUsernamePage = () => {
    const triggerPasswordStep = "enterPassword";
    const triggerUsernameStep = "enterUsername";
    const errorMsg = "Wrong credentials.  Please try again.";
    const accountExists = "That username already exists. Please try again.";
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [step, setStep] = useState(triggerPasswordStep);
    const [error401, setError401] = useState(false);
    const [error409, setError409] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const handlePasswordSubmit = async () => {
        try {
            const response = await verifyPasswordCall(password);
            //const response = await axios.post('http://localhost:8080/verifyPassword', password);
            console.log('Response: ', response.data);

            setStep(triggerUsernameStep);
            setError401(false);
            // if(password === "blah"){
            //     setStep(triggerUsernameStep);
            // }
            //const response = axios.post('')
        } catch(error){
            setError401(true);
            console.log(error);
        }
    }

    const handleUsernameSubmit = async () => {
        //come back and make an update request
        try {
            const response = await changeUsernameCall(userName);
            //const response = await axios.post('http://localhost:8080/changeUsername', userName);
            const newToken = response.data;
            localStorage.setItem("token", newToken);
            //setStep(triggerPasswordStep);
            setError409(false);
            setSuccessMsg("UserName has been changed. Going back to the home screen");

            setTimeout(() => {
                navigate("/home");
                setStep(triggerPasswordStep);
                setSuccessMsg("");
            }, 3000);
            //navigate("/home");
            // if(userName === "123"){
            //     setStep(triggerPasswordStep);
            //     navigate("/home");
            // }
        }catch(error){
            setError409(true);
        }
        
    }

    const handlePasswordInput = (event)=>{
        setPassword(event.target.value);
    }

    const handleUsernameInput = (event) => {
        setUserName(event.target.value);
    }
        

    return (
        <div className='container'>
            <AnimatePresence exitBeforeEnter>
            {step === triggerPasswordStep ? (
                <motion.div
                    className='form-container'
                    key="password"
                    initial={{x: "100%", opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: "-100%", opacity: 0}}
                    /*transition={{duration: 0.5}}*/
                >
                <h1>Enter Your Password</h1>
                {error401 && <div className="error-message">{ errorMsg }</div>}
                <LoginTextBox
                    type = "password"
                    name = "password"
                    value = {password}
                    onChange = { handlePasswordInput }
                    placeHolder = "" 
                />

                <button className='submit-button' onClick={handlePasswordSubmit}>Submit</button>  
                
                </motion.div>
            ) : (
                <motion.div
                    className='form-container'
                    key= "userName"
                    initial={{x: "100%", opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: "-100%", opacity: 0}}
                >
                
                <h1>Enter Your New UserName</h1>
                {error409 && <div className="error-message">{ accountExists }</div>}
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <LoginTextBox
                    type = "text"
                    name = "userName"
                    value = {userName}
                    onChange = { handleUsernameInput }
                    placeHolder = "" 
                />

                <button className='submit-button' onClick={handleUsernameSubmit}>Change UserName</button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}

export default ChangeUsernamePage;