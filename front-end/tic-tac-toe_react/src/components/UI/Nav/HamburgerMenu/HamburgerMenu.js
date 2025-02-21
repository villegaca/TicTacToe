import { React, useState } from 'react';
import Hamburger from 'hamburger-react';
import './HamburgerMenu.css';
import { useNavigate } from 'react-router-dom';

function HamburgerMenu(){
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    //modify this to handle where to go based on what button is clicked
    const handleClick = () => {
        setIsOpen(false);
        navigate("/changeName");
    }
    return(
        <div className='menu-container'>
            <Hamburger
                size = {30}
                toggled = { isOpen }
                toggle = { setIsOpen }
                color = "#201932"
            />

            {isOpen && (
                <div className='menu'>
                    <button className='menu-button' onClick={handleClick}>Change UserName</button>
                    <button className='menu-button'>Delete Account</button>
                    <button className='menu-button'>Sign Out</button>
                </div>
            )}

        </div>  
    )
}

export default HamburgerMenu;