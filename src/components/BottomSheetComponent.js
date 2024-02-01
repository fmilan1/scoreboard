import React, { useEffect, useState } from "react";
import styles from '../screens/styles/Scoreboard.module.css';
import { motion } from "framer-motion"


const PlayerType = {
    Scorer: 1,
    Assister: 2
}

const variants = {
    up: {
        bottom: 0,
    },
    down: {
        bottom: '-100%',
    }
}

export default function BottomSheetComponent({ visible, players, hide }) {

    const [assistIndex, setAssistIndex] = useState(-1);
    const [scorerIndex, setScorerIndex] = useState(-1);

    useEffect(() => {
        setAssistIndex(-1);
        setScorerIndex(-1);
    }, [visible]);

    function playerList(type) {
        const listItems = players.map((player, index) => {

            return (
                <button
                    key={index}
                    onClick={() => {
                        if (type == PlayerType.Assister) {
                            setAssistIndex(index);
                        }
                        else if (type == PlayerType.Scorer) {
                            setScorerIndex(index);
                        }
                    }}

                    className={(type == PlayerType.Assister && index == assistIndex) || (type == PlayerType.Scorer && index == scorerIndex) ? styles.toggled : null}
                >
                    <span>{player.number}</span>
                    <span>{player.name}</span>
                </button>
            );
        });

        return listItems;
    }

    return (
        <motion.div
            className={styles.bottomSheetContainer}
            animate={visible ? 'up' : 'down'}
            variants={variants}
        >
            <span>Assziszt</span>
            <span>Pont</span>
            <div className={styles.assistContainer}>
                {playerList(PlayerType.Scorer)}
            </div>

            <div className={styles.scorerContainer}>
                {playerList(PlayerType.Assister)}
            </div>

            <button
                className={styles.okButton}
                onClick={hide}
                disabled={assistIndex == -1 || scorerIndex == -1}
            >Ok</button>
        </motion.div>
    );
}