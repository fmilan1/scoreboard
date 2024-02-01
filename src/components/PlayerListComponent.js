import React, { useEffect, useState } from "react";
import styles from '../screens/styles/NewScoreboard.module.css';

export default function PlayerListComponent({ team, update }) {

    const [thisTeam, setThisTeam] = useState(team);

    useEffect(() => {
        update(thisTeam);
    }, [thisTeam]);

    const listItems = thisTeam.players.map((player, index) => (
        <div className={styles.listItem} key={index}>
            <button className={`${styles.index} ${styles.button}`}
                title="Játékos eltávolítása"

                onClick={() => {
                    setThisTeam((prev) => {

                        let tmp = [...prev.players];
                        tmp.splice(index, 1);
                        let textboxes = [document.querySelectorAll(`#name-${thisTeam.id}`), document.querySelectorAll(`#number-${thisTeam.id}`)];
                        for (let i = 0; i < tmp.length; i++) {
                            textboxes[0][i].value = tmp[i].name;
                            textboxes[1][i].value = parseInt(tmp[i].number);
                        }
                        return { id: thisTeam.id, name: thisTeam.name, players: [...tmp] };
                    });

                }}>
                {index + 1}
            </button>
            <input className={styles.input} type="text" id={`name-${thisTeam.id}`} defaultValue={player.name} onChange={(e) => {
                player.name = e.target.value;
                update(thisTeam);
            }} />
            <input className={styles.input} type="number" id={`number-${thisTeam.id}`} defaultValue={player.number} onChange={(e) => {
                player.number = parseInt(e.target.value)
                update(thisTeam);
            }} />
        </div>
    ));

    return (
        <div className={styles.listContainer} >
            <button className={styles.input} type='button' disabled={thisTeam.players.length >= 20}
                onClick={() => {
                    setThisTeam(() => {
                        return { id: thisTeam.id, name: thisTeam.name, players: [...thisTeam.players, { name: '', number: '' }] }
                    });
                }}>Játékos hozzáadása</button>
            {listItems}
        </div>
    );
}