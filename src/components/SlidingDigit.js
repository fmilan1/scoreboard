import React, { useEffect, useState } from 'react';
import styles from '../screens/styles/Scoreboard.module.css';
import { Spring, animated, useSpring, config } from '@react-spring/web'


export default function SlidingDigit({ data, index, lineHeight, animate, direction}) {

    const [shownIndex, setShownIndex] = useState(data[index]);
    const [y, setY] = useState(-lineHeight);
    const [loading, setLoading] = useState(true);
    const [doAnimation, setDoAnimation] = useState(animate);

    useEffect(() => {
        if (loading) {
            setLoading(false);
            return;
        }
        setDoAnimation(animate);
        slide();
    }, [index]);
    
    useEffect(() => {
        setY(-lineHeight)
    }, [lineHeight])

    
    function slide() {
        setY(direction > 0 ? 0 : -2 * lineHeight);
    }

    const springs = useSpring({
        y: y,
        onRest: (e) => {
            if (e.finished) {
                setShownIndex(index);
                setDoAnimation(false);
                setY(-lineHeight);
            }
        },
        config: {
            tension: doAnimation ? 500 : 0,
        }

    });


    return (
        <div className={styles.digitContainer}>
            <animated.div
                style={springs}
                className={styles.digit}
            >
                {(data[shownIndex + 1] != undefined ? data[shownIndex + 1] : data[0]) + '\n' + data[shownIndex] + '\n' + (data[shownIndex - 1] != undefined ? data[shownIndex - 1] : data[data.length - 1])}
                {/* 1 */}
            </animated.div>
        </div>
    )
}