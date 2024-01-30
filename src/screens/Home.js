import React, { useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styles from './styles/Home.module.css';
import { uid } from "uid";

export default function Home() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const [myTeams, setMyTeams] = useState([]);

    function createTeamInDatabase() {
        // console.log(user.uid, user.email);
        set(ref(db, `/${user.uid}/teams/${uid()}`), {
            name: 'Uj csapat',
        });


    }

    useState(() => {
        const teamRef = ref(db, `/${user.uid}/teams/`);
        onValue(teamRef, (snapshot) => {
            let tmpList = [];
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                // console.log(data, key);
                tmpList.push(data.name);
            })
            setMyTeams([...tmpList]);
        });
    }, []);



    const myTeamsRenderItems = myTeams.map((name, index) => {
        return (
            <section key={index} className={styles.team}>
                {name}
                <img className={styles.teamLogo} src="https://scontent.xx.fbcdn.net/v/t1.15752-9/416385981_1160666734911714_6105998791939796377_n.png?stp=dst-png_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=61f064&_nc_ohc=i-qZlXc46uQAX-CBIN6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSS7POnH8x8OORTme1L7omVJ888gASCRNBOKK4LDAAiHw&oe=65E097F1" />
            </section>
        )
    });

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
                {/* <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/belepes/');
                }}>Kijenlentkezés</button> */}

                {/* <button onClick={writeToDatabase} >write</button> */}
                <header className={styles.mainHeader}>
                    <h2>Saját csapatok</h2>
                    <i className={`fa-solid fa-plus ${styles.button}`} onClick={() => {
                        createTeamInDatabase();
                        // setMyTeams([...myTeams, 'OUT']);
                    }} />
                </header>
                <div className={styles.teamsContainer}>
                    {myTeamsRenderItems}
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    )
}