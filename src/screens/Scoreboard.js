import { useLocation } from "react-router-dom";
import styles from './styles/Scoreboard.module.css';
import Counter from "../components/Counter";
import { useEffect } from "react";


function Scoreboard() {

    const { state } = useLocation();



    return (
        <>
            <header className={styles.header}>

                kecske
            </header>
            <main className={styles.main}>

                <Counter teamName={state.teamNames.team1Name} />
                <Counter teamName={state.teamNames.team2Name} />
            </main>
        </>
    );
}

export default Scoreboard;