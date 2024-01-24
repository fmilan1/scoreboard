import { useEffect, useState } from 'react'
import styles from '../screens/styles/Scoreboard.module.css'
import SlidingDigit from './SlidingDigit'

export default function Counter({ teamName }) {

    const [point, setPoint] = useState(0);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [lineHeight, setLineHeight] = useState(document.body.clientWidth * 0.25);
    const [animate, setAnimate] = useState(true);
    const [dir, setDir] = useState(1);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setLineHeight(document.body.clientWidth * 0.25);
        });
    })

    return (
        <div
            className={styles.counterContainer}
            onMouseDown={(e) => {
                setAnimate(true);
                if (e.button == 2) {
                    if (point == 0) return;
                    setDir(-1);
                    setPoint(point - 1);
                    return;
                }
                setDir(1);
                setPoint(point + 1);
            }}
            onWheel={(e) => {
                setAnimate(false);
                e.deltaY > 0 ? ((point > 0) && setPoint(point - 1)) : setPoint(point + 1);
                
            }}
        >
            <div className={styles.teamName}>
                {teamName}
            </div>
            <div className={styles.slidingDigitContainer}>

                <SlidingDigit
                    animate={animate}
                    data={digits}
                    index={Math.floor(point / 10) % 10}
                    lineHeight={lineHeight}
                    direction={dir}
                    />
                <SlidingDigit
                    animate={animate}
                    data={digits}
                    index={point % 10}
                    lineHeight={lineHeight}
                    direction={dir}
                />
            </div>
        </div>
    )
}