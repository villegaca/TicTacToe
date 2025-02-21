import { React, useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const Header = () => {
    const aboutMsg = "Welcome to tic-tac-toe.\nHere you can play against a ruthless AI bot and keep track of your wins and losses.\nCan you beat our champion?";
    const[menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        if(menuOpen){
            setMenuOpen(false)
        } else{
            setMenuOpen(true);
        }
        
    }
    return (
        <header className= "header">
            <div className='logo-container'>
                <Link to = "/home" className= "logo-link">
                    <img src="images/tic tac toe logo.png" alt= "logo" className= "logo"/>
                </Link>
            </div>

            <div className='right-container'>
                <div className= "about">
                    <button className= "about-button" onClick={toggleMenu}> About </button>
                    {menuOpen && (
                        <div className= 'about-dropdown'>
                            <pre> {aboutMsg} </pre>
                        </div>
                    )}
                </div>
                <div className='hamburger-menu-container'>
                    <HamburgerMenu/>
                </div>
            </div>

            <div className='hamburger' onClick= {toggleMenu}>

            </div>
        </header>
    );
};

export default Header;