import React, { useEffect, useState } from "react";
import { db, user } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styles from './styles/Home.module.css';
import { uid } from "uid";
import TeamComponent from "../components/TeamComponent";

export default function Home() {

    const navigate = useNavigate();


    // const [userObj, setUserObj] = useState({});
    const [myTeams, setMyTeams] = useState([]);

    useEffect(() => {
        onValue(ref(db, `/users/${user.getUser.uid}/teams`), snapshot => {
            if (!snapshot.exists()) return;
            setMyTeams(Object.values(snapshot.exportVal()));
        });

    }, [])


    return (
        <>
            <header className={styles.header}>
                <h2>Üdv{user.getUser.displayName ? `, ${user.getUser.displayName}` : `, ${user.getUser.email}`}!</h2>
                <i className={`fa-regular fa-circle-user ${styles.button} ${styles.profileBtn}`} onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/belepes/');
                }}></i>
            </header>
            <main className={styles.mainContainer}>
                <header className={styles.mainHeader}>
                    {/* <button onClick={async () => {
                        set(ref(db, `/users/${user.getUser.uid}/teams`), {
                            asd: 'asd',
                        })
                    }}>haha</button> */}
                    <h3>Saját csapatok</h3>
                    <i className={`fa-solid fa-plus ${styles.button}`} onClick={async () => {
                        const newTeamUID = uid();
                        set(ref(db, `/users/${user.getUser.uid}/teams/${newTeamUID}`), {
                            uid: newTeamUID,
                            name: 'Uj csapat'
                        });
                        // const updatedUserObj = { ...userObj, teams: [...userObj.teams, newTeamUID] };
                        // setDoc(doc(db, 'users', user.getUser.uid), updatedUserObj);


                        // setDoc(doc(db, 'teams', newTeamUID), {
                        //     uid: newTeamUID,
                        //     name: 'asd',
                        // })

                        // navigate(`csapat?${newTeamUID}`);
                    }} />
                </header>
                <div className={styles.contentContainer}>
                    {/* {[1, 2, 3]} */}
                    {/* {myTeams && myTeams.map((uid, index) => <div>{uid} {index}</div>)} */}
                    {console.log(myTeams.map((team, index) => team))}
                    {myTeams.map((team, index) => <TeamComponent key={index} name={team.name} uid={team.uid} />)}
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    )
}