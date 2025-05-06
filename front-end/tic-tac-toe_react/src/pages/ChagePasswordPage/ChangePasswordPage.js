import {React, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import LoginTextBox from '../../components/UI/LoginTextBox/LoginTextBox';
import { useNavigate } from 'react-router-dom';
import { verifyPasswordCall } from "../../api/UserServiceFunctions";
import { changePasswordCall } from "../../api/UserServiceFunctions";
import "./ChangePasswordPage.css"

const ChangePasswordPage = () => {
    const triggerPasswordStep = "enterPassword";
    const triggerNewPasswordStep = "enterNewPassword";
    const errorMsg = "Wrong credentials.  Please try again.";
    const dontMatchMsg = "Passwords Do Not Match.  Please Try Again.";
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [step, setStep] = useState(triggerPasswordStep);
    const [error401, setError401] = useState(false);
    //const [error409, setError409] = useState(false);
    const [matchError, setMatchError] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const handlePasswordSubmit = async () => {
        try {
            const response = await verifyPasswordCall(password);
            //const response = await axios.post('http://localhost:8080/verifyPassword', password);
            console.log('Response: ', response.data);

            setStep(triggerNewPasswordStep);
            setError401(false);
            setPassword("");
        } catch(error){
            setError401(true);
            console.log(error);
        }
    }

    const handleNewPasswordSubmit = async () => {
        if(password !== secondPassword){
            setMatchError(true);
            return;
        }

        try {
            const response = await changePasswordCall(password);
            //const response = await axios.post('http://localhost:8080/changeUsername', userName);
            const newToken = response.data;
            localStorage.setItem("token", newToken);
            setMatchError(false);
            setSuccessMsg("Password has been changed. Going back to the home screen");

            setTimeout(() => {
                navigate("/home");
                setStep(triggerPasswordStep);
                setSuccessMsg("");
            }, 3000);
        }catch(error){
            console.error("unexpected error", error);
            //setError409(true);
        }
        
    }

    const handlePasswordInput = (event)=>{
        setPassword(event.target.value);
    }

    const handleSecondPasswordInput = (event) => {
        setSecondPassword(event.target.value);
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
                    key= "newPassword"
                    initial={{x: "100%", opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: "-100%", opacity: 0}}
                >
                
                <h1>Enter Your New Password</h1>
                {matchError && <div className="error-message">{ dontMatchMsg }</div>}
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <LoginTextBox
                    type = "password"
                    name = "password"
                    value = {password}
                    onChange = { handlePasswordInput }
                    placeHolder = "" 
                />
                <LoginTextBox
                    type = "password"
                    name = "confirmPassword"
                    value = {secondPassword}
                    onChange = { handleSecondPasswordInput }
                    placeHolder = "" 
                />

                <button className='submit-button' onClick={handleNewPasswordSubmit}>Change Password</button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}

export default ChangePasswordPage;