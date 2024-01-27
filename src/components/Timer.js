import React, { useEffect, useState } from 'react';
import styles from '../screens/styles/Scoreboard.module.css';


String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var minutes = Math.floor((sec_num) / 60);
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}

export default function Timer({ startTime, minutes }) {

    const calcEndTime = () => {
        let tmp = new Date(startTime);
        tmp.setMinutes(tmp.getMinutes() + minutes);
        return tmp;
    }

    const [endTime, setEndTime] = useState(calcEndTime());
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState((endTime.getTime() - new Date().getTime()) / 1000 + 1);


    useEffect(() => {
        const timer = setInterval(() => {
            if (startTime > new Date().getTime()) {
                setTimeLeftInSeconds(Math.floor((endTime.getTime() - new Date().getTime()) / 1000 - minutes * 60) + 1)
            }
            else {
                setTimeLeftInSeconds((endTime.getTime() - new Date().getTime()) / 1000 + 1);
            }
        }, 100);

        return () => {
            clearInterval(timer);
        }
    }, []);

    const calcGameMinute = () => {
        return Math.ceil((minutes * 60 - timeLeftInSeconds + 1) / 60);
    }

    const calcAdditionalTime = () => {
        return '+' + Math.ceil(timeLeftInSeconds * -1).toString().toMMSS();
    }

    return (
        <div
            className={`${styles.timerContainer} ${timeLeftInSeconds <= 1 ? styles.overTime : ''}`}
        >
            <div
                className={styles.gameMinute}
            >
                {startTime <= new Date().getTime() ? calcGameMinute() + "'" : 'Kezdés: '}
            </div>
            <div
                className={styles.timeRemaining}
            >
                {new Date().getTime() < endTime.getTime() ? timeLeftInSeconds.toString().toMMSS() : calcAdditionalTime()}
            </div>
        </div>
    )
}