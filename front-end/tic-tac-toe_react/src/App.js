import './App.css';
import GamePage from './pages/GamePage/GamePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = "/logIn" element = {<LoginPage/>}/>
          <Route path = "/signUP" element = {<SignUpPage/>}/> 
          <Route path = "/home" element = {<HomePage/>}/>
          <Route path = "/gamePage" element = {<GamePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
