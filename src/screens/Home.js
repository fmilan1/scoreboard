import { useEffect, useState } from 'react';
import styles from './styles/Home.module.css'
import PlayerList from '../components/PlayerList';
import { useNavigate } from 'react-router-dom'


function Home() {

    const [teams, setTeams] = useState({
        team1: {
            id: 0,
            name: 'Csapat 1',
            players: [{ name: 'Fazekas Milan', number: 37 }],
        },
        team2: {
            id: 1,
            name: 'Csapat 2',
            players: [{ name: 'Kiss Kecske', number: 69 }],
        }
    });

    const navigate = useNavigate();

    function updateTeam(updatedTeam) {
        setTeams({ team1: updatedTeam.id == teams.team1.id ? updatedTeam : teams.team1, team2: updatedTeam.id == teams.team2.id ? updatedTeam : teams.team2 });
    }

    return (
        <>
            <header className={styles.header}>
                Új pontszámláló beállítása
            </header>
            <main className={styles.main} >
                <div className={styles.mainContainer} >
                    <div className={styles.row} >

                        <div className={styles.column}>
                            <input type='text' defaultValue={teams.team1.name} className={styles.teamNameTextbox} onChange={(e) => teams.team1.name = e.target.value} />
                            <PlayerList team={teams.team1} update={updateTeam} />
                        </div>

                        <div className={styles.column}>
                            <input type='text' defaultValue={teams.team2.name} className={styles.teamNameTextbox} onChange={(e) => teams.team2.name = e.target.value} />
                            <PlayerList team={teams.team2} update={updateTeam} />
                        </div>
                    </div>
                    <div className={styles.settingsContainer}>
                        <div className={styles.title}>Kezdés</div>
                        <input className={styles.input} type='datetime-local' id='startTime' defaultValue={new Date(new Date().setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset())).toISOString().slice(0, 16)} />
                        <div className={styles.title}>Játékpercek</div>
                        <input className={styles.input} type='number' id='minutes' defaultValue={100} />
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button} onClick={() => navigate('/scoreboard/', { state: { teams, startTime: new Date(document.querySelector('#startTime').value), minutes: parseInt(document.querySelector('#minutes').value) } })}>
                            Indítás
                        </button>
                    </div>
                </div>
            </main>
        </>
    );


}

export default Home;
