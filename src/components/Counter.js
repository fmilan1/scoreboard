import { useEffect, useState } from 'react'
import styles from '../screens/styles/Scoreboard.module.css'
import SlidingDigit from './SlidingDigit'

export default function Counter({teamName}) {
    const [point, setPoint] = useState(0);



    return (
        <div
            className={styles.counterContainer}
            onClick={() => setPoint(point + 1)}
        >
            <div className={styles.teamName}>
                {teamName}
            </div>
            <SlidingDigit
                data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                index={point % 10}
            />
        </div>
    )
}