import { React, useState } from 'react';
import Hamburger from 'hamburger-react';
import './HamburgerMenu.css';
import { useNavigate } from 'react-router-dom';
import DeleteAccountButton from '../../Buttons/DeleteAccountButton/DeleteAccountButton';
import DeleteAccountModal from '../../Modals/DeleteAccountModal';
import { deleteAccountCall } from '../../../../api/UserServiceFunctions';

function HamburgerMenu(){
    const [isOpen, setIsOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    //modify this to handle where to go based on what button is clicked
    const handleClick = () => {
        setIsOpen(false);
        navigate("/changeName");
    }

    const handleDeleteClick = async () => {
        setError("");
        setIsOpen(false);
        setShowDeleteModal(true);   
    }

    const handleConfirmDelete = async () => {
        console.log("acccount deleted");
        try{
            await deleteAccountCall(password);
            localStorage.removeItem("token");
            setShowDeleteModal(false);
            navigate("/login");
        } catch (error) {
            if(error.response?.status === 401){
                setError("Wrong Password");
            } else {
                console.error("Error deleting account", error);
                throw error;
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setError("");
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/logIn');
    }

    return(
        <div className='menu-container'>
            <Hamburger
                size = {40}
                toggled = { isOpen }
                toggle = { setIsOpen }
                // color = "#201932"
                color = "#00c3f2"
            />

            {isOpen && (
                <div className='menu'>
                    <button className='menu-button' onClick={handleClick}>Change UserName</button>
                    {/*<button className='menu-button'>Delete Account</button>*/}
                    <DeleteAccountButton onClick={handleDeleteClick}/>
                    <button className='menu-button' onClick = { handleSignOut }>Sign Out</button>
                </div>
            )}

            {showDeleteModal && (
                <DeleteAccountModal
                    password = {password}
                    onPasswordChange={handlePasswordChange}
                    onConfirm = {handleConfirmDelete}
                    onCancel = {handleCancelDelete}
                    error = {error}
                />
            )}

        </div>  
    )
}

export default HamburgerMenu;