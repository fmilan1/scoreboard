import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import './App.css'
import Scoreboard from './screens/Scoreboard';
import NotFound from './screens/NotFound';

function App() {

    document.addEventListener('contextmenu', event => event.preventDefault());


    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/scoreboard' Component={Scoreboard} />
                <Route path='*' Component={NotFound} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
