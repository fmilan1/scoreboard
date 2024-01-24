import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import './App.css'
import Scoreboard from './screens/Scoreboard';

function App() {

    const [teamNames, setTeamName] = useState(['Csapat 1', 'Csapat 2']);
    const [players, setPlayers] = useState([{ name: 'Kiss Pista', number: 42 }]);


    document.addEventListener('contextmenu', event => event.preventDefault());


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/scoreboard' Component={Scoreboard} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
