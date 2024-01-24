import { useEffect, useState } from 'react';
import styles from '../screens/styles/Scoreboard.module.css';
import { Spring, animated, useSpring } from '@react-spring/web'


export default function SlidingDigit({ data, index }) {

    const [shown, setShown] = useState(data[index]);
    const [doAnimate, setDoAnimate] = useState(false)

    let springs;
    useEffect(() => {
        // animated();
        setDoAnimate(true)
    }, [index]);

    // function animated() {
        springs = useSpring({
            from: { y: 0 },
            to: { y: 100 },
        })
    // }


    return (
        <animated.div
            style={springs}
        >
            {data[index]}
        </animated.div>
    )
}