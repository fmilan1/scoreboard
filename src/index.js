import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import reportWebVitals from './reportWebVitals';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import NewScoreboard from './screens/NewScoreboard';
import Home from './screens/Home';
import Scoreboard from './screens/Scoreboard';
import NotFound from './screens/NotFound';
import ProtectHome from './components/ProtectHomeComponent';
import Login from './screens/Login';
import Teams from './screens/Teams';

document.addEventListener('contextmenu', event => event.preventDefault());

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={null}>
            <Route path='/' element={<ProtectHome />} >
                <Route path='/' index element={<Home />} />
                <Route path='/csapat' element={<Teams />} />
                <Route path='/szamlalo' element={<Scoreboard />} />
                <Route path='/ujszamlalo' element={<NewScoreboard />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/belepes/' element={<Login />} />
        </Route>
    )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
