import React, { useState } from "react";
import styles from '../screens/styles/Home.module.css';

export default function PlayerList({ data, team }) {

    const [players, setPlayers] = useState([...data]);
    const [hoveredButtonIdx, setHoveredIdx] = useState(null);

    const listItems = players.map((player, index) => (
        <>
            <button className={styles.index}
                title="Játékos eltávolítása"
                onMouseOver={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}


                onClick={() => {
                    setPlayers((prev) => {
                        let tmp = [...prev];
                        tmp.splice(index, 1);
                        let textboxes = [document.querySelectorAll(`#name-${team}`), document.querySelectorAll(`#number-${team}`)];
                        console.log(textboxes);
                        for (let i = 0; i < tmp.length; i++) {
                            textboxes[0][i].value = tmp[i].name;
                            textboxes[1][i].value = parseInt(tmp[i].number);
                        }
                        return [...tmp];
                    });
                }}>
                {index + 1}.
            </button>
            <input className={styles.input} type="text" id={`name-${team}`} defaultValue={player.name} onChange={(e) => player.name = e.target.value} />
            <input className={styles.input} type="number" id={`number-${team}`} defaultValue={player.number} onChange={(e) => player.number = parseInt(e.target.value)} />
        </>
    ));

    return (
        <div className={styles.listContainer} >
            <button type='button' disabled={players.length >= 20} onClick={() => setPlayers([...players, { name: '', number: '' }])}>Játékos hozzáadása</button>
            {listItems}
        </div>
    )
}