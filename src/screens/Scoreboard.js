import { useLocation } from 'react-router-dom';
import styles from './styles/Scoreboard.module.css';
import Counter from '../components/Counter';
import Timer from '../components/Timer';
import { useEffect } from 'react';

function Scoreboard() {

    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
    }, [])

    return (
        <>
            <header className={styles.header}>

                <Timer minutes={state.minutes} startTime={state.startTime} />
            </header>
            <main className={styles.main}>

                <Counter team={state.teams.team1} />
                <Counter team={state.teams.team2} />
            </main>
        </>
    );
}

export default Scoreboard;
