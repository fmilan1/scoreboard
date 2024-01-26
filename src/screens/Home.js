import { useEffect, useState } from 'react';
import styles from './styles/Home.module.css'
import PlayerList from '../components/PlayerList';
import { useNavigate } from 'react-router-dom'


function Home() {

    const [teamNames, setTeamNames] = useState(['Csapat 1', 'Csapat 2']);
    const [players, setPlayers] = useState([[{ name: 'Kiss Pista', number: 42 }], [{ name: 'Nagy István', number: 69 }]])

    const navigate = useNavigate();

    useEffect(() => {
        console.log(players);
    })

    function updatePlayers(data) {
        setPlayers(data);
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
                            <input type='text' defaultValue={teamNames[0]} className={styles.teamNameTextbox} onChange={(e) => setTeamNames([e.target.value, teamNames[1]])} />
                            <PlayerList data={players} team={0} update={updatePlayers} />

                        </div>

                        <div className={styles.column}>
                            <input type='text' defaultValue={teamNames[1]} className={styles.teamNameTextbox} onChange={(e) => setTeamNames([teamNames[0], e.target.value])} />
                            <PlayerList data={players} team={1} update={updatePlayers} />
                        </div>
                    </div>
                    <div className={styles.settingsContainer}>
                        <div className={styles.title}>Kezdés</div>
                        {/* <input className={styles.input} type='time' id='startTime' defaultValue={new Date().toString().split(' ')[4].substring(0, 5)} /> */}
                        <input className={styles.input} type='datetime-local' id='startTime' defaultValue={new Date(new Date().setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset())).toISOString().slice(0, 16)} />
                        <div className={styles.title}>Játékpercek</div>
                        <input className={styles.input} type='number' id='minutes' defaultValue={100} />
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button} onClick={() => navigate('/scoreboard/', { state: { teams: { team1: { name: teamNames[0], players: players[0] }, team2: { name: teamNames[1], players: players[1] } }, startTime: new Date(document.querySelector('#startTime').value), minutes: parseInt(document.querySelector('#minutes').value) } })}>
                            Indítás
                        </button>
                    </div>
                </div>
            </main>
        </>
    );


}

export default Home;
