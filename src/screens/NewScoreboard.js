import styles from './styles/NewScoreboard.module.css'
import PlayerList from '../components/PlayerList';
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

export default function NewScoreboard() {

    const navigate = useNavigate();

    console.log(db);

    const [team1, setTeam1] = useState(
        JSON.parse(localStorage.getItem('team1')) == null ?
            {
                id: 0,
                name: 'Csapat 1',
                players: [],
            } :
            JSON.parse(localStorage.getItem('team1'))
    );

    const [team2, setTeam2] = useState(
        JSON.parse(localStorage.getItem('team2')) == null ?
            {
                id: 1,
                name: 'Csapat 2',
                players: [],
            } :
            JSON.parse(localStorage.getItem('team2'))
    );

    const [minutes, setMinutes] = useState(
        localStorage.getItem('minutes') ? parseInt(localStorage.getItem('minutes')) : 100
    );

    const [startTime, setStartTime] = useState(
        new Date(new Date().setMinutes(new Date().getMinutes() + 1, 0, 0)).getTime()
    );

    function updateTeam(updatedTeam) {
        if (updatedTeam.id == team1.id) {
            setTeam1(updatedTeam);
        }
        else if (updatedTeam.id == team2.id) {
            setTeam2(updatedTeam);
        }
        saveState();
    }

    useEffect(() => {
        saveState();
    });


    function saveState() {
        localStorage.setItem('team1', JSON.stringify(team1));
        localStorage.setItem('team2', JSON.stringify(team2));
        localStorage.setItem('minutes', minutes);
    }

    return (
        <>
            <header className={styles.header}>
                <div>Új pontszámláló beállítása</div>
            </header>
            <main className={styles.main} >
                <div className={styles.mainContainer} >
                    <div className={styles.row} >

                        <div className={styles.column}>
                            <input type='text' defaultValue={team1.name} className={styles.teamNameTextbox} onChange={(e) => {
                                setTeam1({
                                    id: 0,
                                    name: e.target.value,
                                    players: team1.players
                                })
                            }} />
                            <PlayerList team={team1} update={updateTeam} />
                        </div>

                        <div className={styles.column}>
                            <input type='text' defaultValue={team2.name} className={styles.teamNameTextbox} onChange={(e) => {
                                setTeam2({
                                    id: 1,
                                    name: e.target.value,
                                    players: team2.players
                                })
                            }} />
                            <PlayerList team={team2} update={updateTeam} />
                        </div>
                    </div>
                    <div className={styles.settingsContainer}>
                        <div className={styles.title}>Kezdés</div>
                        <input className={styles.input} type='datetime-local' id='startTime' defaultValue={new Date(startTime + 3600000).toISOString().slice(0, 16)} onChange={(e) => {
                            setStartTime(new Date(e.target.value).getTime());
                        }} />
                        <div className={styles.title}>Játékpercek</div>
                        <input className={styles.input} type='number' id='minutes' defaultValue={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))} />
                    </div>
                    <div className={styles.row}>
                        <Link to='/szamlalo/' state={
                            {
                                team1,
                                team2,
                                minutes: minutes,
                                startTime
                            }
                        } >

                            <button className={styles.button} >
                                Indítás
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );



}
