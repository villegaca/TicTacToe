import './App.css';
import GamePage from './pages/GamePage/GamePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import ChangeUsernamePage from './pages/ChangeUsernamePage/ChangeUsernamePage';
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
          <Route path = "/changeName" element = {<ChangeUsernamePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
