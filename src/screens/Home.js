import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { child, onValue, query, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styles from './styles/Home.module.css';
import { uid } from "uid";
import { user, createTeamInDatabase } from '../firebase'
import TeamComponent from "../components/TeamComponent";
import { doc, getDoc, setDoc, collection, where, getDocs } from "firebase/firestore";

export default function Home() {

    const navigate = useNavigate();


    const [userObj, setUserObj] = useState({});
    const [myTeams, setMyTeams] = useState([]);

    useEffect(() => {
        (async () => {
            const obj = (await getDoc(doc(db, 'users', user.getUser.uid))).data();
            setUserObj(obj);
            const teamsRef = collection(db, 'teams');
            if (obj.teams.length == 0) return;
            const q = query(teamsRef, where('uid', 'in', obj.teams));
            const teams = (await getDocs(q)).docs.map(doc => doc.data());
            setMyTeams(teams)
        })();





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
                    <button onClick={async () => {
                        const ref = doc(db, 'users', user.getUser.uid);
                        setDoc(ref, {
                            uid: user.getUser.uid,
                            teams: []
                        });

                        // console.log((await getDoc(ref)).data());
                    }}>haha</button>
                    <h3>Saját csapatok</h3>
                    <i className={`fa-solid fa-plus ${styles.button}`} onClick={async () => {
                        const newTeamUID = uid();
                        const updatedUserObj = { ...userObj, teams: [...userObj.teams, newTeamUID] };
                        setDoc(doc(db, 'users', user.getUser.uid), updatedUserObj);


                        setDoc(doc(db, 'teams', newTeamUID), {
                            uid: newTeamUID,
                            name: 'asd',
                        })

                        navigate(`csapat?${newTeamUID}`);
                    }} />
                </header>
                <div className={styles.contentContainer}>
                    {/* {[1, 2, 3]} */}
                    {myTeams && Object.keys(myTeams).map((uid, index) => <TeamComponent key={index} name={myTeams[uid].name} uid={uid} />)}
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    )
}