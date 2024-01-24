import React, { useState } from "react";

export default function PlayerList({ data }) {

    const [players, setPlayers] = useState(data)

    const listItems = players.map(player => (
        <>
            <input type="text" defaultValue={player.name} />
            <input type="number" defaultValue={player.number} />
        </>
    ))

    return (
        <>
            <div className="listContainer" >
                {listItems}

                <button type='button' onClick={() => setPlayers([...players, {name:'asd', number:37}])}>Játékos hozzáadása</button>
            </div>
        </>
    )
}