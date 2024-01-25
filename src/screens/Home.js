import { useState } from 'react';
import styles from './styles/Home.module.css'
import PlayerList from '../components/PlayerList';
import { useNavigate } from 'react-router-dom'


function Home() {

    const [teamNames, setTeamNames] = useState(['Csapat 1', 'Csapat 2']);
    const [players, setPlayers] = useState([{ name: 'Kiss Pista', number: 42 }])

    const navigate = useNavigate();

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
                            <PlayerList data={players} team={1} />

                        </div>

                        <div className={styles.column}>
                            <input type='text' defaultValue={teamNames[1]} className={styles.teamNameTextbox} onChange={(e) => setTeamNames([teamNames[0], e.target.value])} />
                            <PlayerList data={players} team={2} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <button onClick={() => navigate('/scoreboard', { state: { teamNames: { team1Name: teamNames[0], team2Name: teamNames[1] } } })}>
                            Indítás
                        </button>
                    </div>
                </div>
            </main>
        </>
    );


}

export default Home;
