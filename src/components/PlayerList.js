import React, { useState } from "react";
import styles from '../screens/styles/Home.module.css';

export default function PlayerList({ data }) {

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
                        let textboxes = [document.querySelectorAll('#name'), document.querySelectorAll('#number')];
                        for (let i = 0; i < tmp.length; i++) {
                            textboxes[0][i].value = tmp[i].name;
                            textboxes[1][i].value = parseInt(tmp[i].number);
                        }
                        return [...tmp];
                    });
                }}>
                {index + 1}.
            </button>
            <input className={styles.input} type="text" id="name" defaultValue={player.name} onChange={(e) => player.name = e.target.value} />
            <input className={styles.input} type="number" id="number" defaultValue={player.number} onChange={(e) => player.number = parseInt(e.target.value)} />
        </>
    ));

    return (
        <div className={styles.listContainer} >
            {listItems}
            <button type='button' disabled={players.length >= 20} onClick={() => setPlayers([...players, { name: '', number: '' }])}>Játékos hozzáadása</button>
        </div>
    )
}