import { useEffect, useState } from 'react'
import styles from '../screens/styles/Scoreboard.module.css'
import SlidingDigit from './SlidingDigit'
import BottomSheet from './BottomSheet';
import { useSwipeable } from 'react-swipeable';

export default function Counter({ team }) {

    const [firstCall, setFirstCall] = useState(true);

    const [point, setPoint] = useState(0);
    const [prevPoint, setPrevPoint] = useState(point);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [lineHeight, setLineHeight] = useState(document.body.clientWidth * 0.25);
    const [animate, setAnimate] = useState(true);
    const [dir, setDir] = useState(1);
    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);

    const handlers = useSwipeable({
        onSwiped: (e) => {
            if (e.dir == 'Down') {
                increasePoint();
            }
            else if (e.dir == 'Up') {
                decreasePoint();
            }
        }
    });

    function increasePoint() {
        if (visibleBottomSheet) return;
        setDir(1);
        setPoint(point + 1);
    }

    function decreasePoint() {
        if (visibleBottomSheet || point == 0) return;
        setDir(-1);
        setPoint(point - 1);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setLineHeight(document.body.clientWidth * 0.25);
        });
    }, []);

    useEffect(() => {
        if (firstCall) return;
        if (point > prevPoint)
            setVisibleBottomSheet(true);
        setPrevPoint(point)

    }, [point]);


    useEffect(() => {
        setFirstCall(false);
    }, []);

    return (
        <div
            {...handlers}
            className={styles.counterContainer}
            onMouseDown={(e) => {
                setAnimate(true);
                if (e.button == 2) {
                    if (point == 0) return;
                    decreasePoint();
                    return;
                }
                increasePoint();
            }}
            onWheel={(e) => {
                if (visibleBottomSheet) return;
                setAnimate(false);
                e.deltaY > 0 ? decreasePoint() : increasePoint();

            }}
        >
            <div className={styles.teamName}>
                {team.name}
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
            <BottomSheet visible={visibleBottomSheet} players={team.players} hide={() => setVisibleBottomSheet(false)} />
        </div>
    )
}