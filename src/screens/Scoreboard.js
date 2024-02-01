import { useLocation } from 'react-router-dom';
import styles from './styles/Scoreboard.module.css';
import Counter from '../components/CounterComponent';
import Timer from '../components/TimerComponent';

function Scoreboard() {

    const { state } = useLocation();

    return (
        <>
            <header className={styles.header}>
                <Timer minutes={state.minutes} startTime={state.startTime} />
            </header>
            <main className={styles.main}>
                <Counter team={state.team1} />
                <Counter team={state.team2} />
            </main>
        </>
    );
}

export default Scoreboard;
