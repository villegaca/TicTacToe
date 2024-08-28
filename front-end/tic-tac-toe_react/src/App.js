import './App.css';
import GamePage from './pages/GamePage/GamePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import GameSelectPage from './pages/GameSelectPage/GameSelectPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = "/logIn" element = {<LoginPage/>}/>
          <Route path = "/signUP" element = {<SignUpPage/>}/> 
          <Route path = "/gameSelect" element = { <GameSelectPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
