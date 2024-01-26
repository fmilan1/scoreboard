import React, { useEffect, useState } from "react";
import styles from '../screens/styles/Home.module.css';

export default function PlayerList({ data, team, update }) {

    const [players, setPlayers] = useState(data);
    const [hoveredButtonIdx, setHoveredIdx] = useState(null);

    // useEffect(() => {
    //     console.log(players[team]);
    // })

    const listItems = players[team].map((player, index) => (
        <>
            <button className={`${styles.index} ${styles.button}`}
                title="Játékos eltávolítása"
                onMouseOver={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}


                onClick={() => {
                    setPlayers((prev) => {
                        let tmp = [...prev];
                        tmp.splice(index, 1);
                        let textboxes = [document.querySelectorAll(`#name-${team}`), document.querySelectorAll(`#number-${team}`)];
                        for (let i = 0; i < tmp.length; i++) {
                            textboxes[0][i].value = tmp[i].name;
                            textboxes[1][i].value = parseInt(tmp[i].number);
                        }
                        return [...tmp];
                    });
                }}>
                {index + 1}
            </button>
            <input className={styles.input} type="text" id={`name-${team}`} defaultValue={player.name} onChange={(e) => player.name = e.target.value} />
            <input className={styles.input} type="number" id={`number-${team}`} defaultValue={player.number} onChange={(e) => player.number = parseInt(e.target.value)} />
        </>
    ));

    return (
        <div className={styles.listContainer} >
            <button className={styles.input} type='button' disabled={players[team].length >= 20}
                onClick={() => {
                    setPlayers(() => {
                        let tmp = [...players];
                        tmp[team].push({ name: '', number: '' });
                        return tmp;
                    });
                    update(players);
                }}>Játékos hozzáadása</button>
            {listItems}
        </div>
    )
}