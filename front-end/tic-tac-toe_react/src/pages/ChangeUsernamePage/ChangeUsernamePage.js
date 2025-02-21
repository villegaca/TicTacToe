import {React, useState} from 'react';
import './ChangeUsernamePage.css';
import { AnimatePresence, motion } from 'framer-motion';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangeUsernamePage = () => {
    const triggerPasswordStep = "enterPassword";
    const triggerUsernameStep = "enterUsername";
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [step, setStep] = useState(triggerPasswordStep);
    const navigate = useNavigate();

    const handlePasswordSubmit = () => {
        try {
            if(password === "blah"){
                setStep(triggerUsernameStep);
            }
            //const response = axios.post('')
        } catch(error){
            console.log(error);
        }
    }

    const handleUsernameSubmit = () => {
        //come back and make an update request
        if(userName === "123"){
            setStep(triggerPasswordStep);
            navigate("/home");
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