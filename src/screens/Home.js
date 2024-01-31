import React, { useState } from "react";
import { db } from "../firebase";
import { child, onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styles from './styles/Home.module.css';
import { uid } from "uid";
import { user, createTeamInDatabase } from '../firebase'
import Team from "../components/Team";

export default function Home() {

    const navigate = useNavigate();

    // console.log(user);

    const [myTeams, setMyTeams] = useState({});

    

    useState(() => {
        const teamRef = ref(db, `/users/${user.uid}/teams/`);
        onValue(teamRef, (snapshot) => {
            // let tmpList = [];
            // snapshot.forEach((childSnapshot) => {
            //     const key = childSnapshot.key;
            //     const data = childSnapshot.val();
            //     // console.log(data);
            //     // tmpList.push(data);
            // })
            let tmp = snapshot.exportVal();
            setMyTeams(tmp);
            // console.log(tmp);
            // setMyTeams([...tmpList]);
        });
    }, []);

    return (
        <>
            <header className={styles.header}>
                <h1>Üdv{user.displayName ? `, ${user.displayName}` : ''}!</h1>
                <i className={`fa-regular fa-user ${styles.button} ${styles.profileBtn}`} onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/belepes/');
                }}></i>
            </header>
            <main className={styles.mainContainer}>
                <header className={styles.mainHeader}>
                    <h2>Saját csapatok</h2>
                    <i className={`fa-solid fa-plus ${styles.button}`} onClick={() => {
                        createTeamInDatabase(uid());
                    }} />
                </header>
                <div className={styles.teamsContainer}>
                    {myTeams && Object.keys(myTeams).map((uid, index) => <Team key={index} name={myTeams[uid].name} uid={uid}/>)}
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    )
}