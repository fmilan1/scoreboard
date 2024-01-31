import React, { useState } from 'react';
import styles from './styles/Home.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

import { db, user } from '../firebase';
import { uid } from 'uid';
import { child, get, onValue, ref, set } from 'firebase/database';

export default function Teams() {

    const location = useLocation();
    const navigate = useNavigate();

    const thisTeamUID = location.search.replace('?', '');
    const thisTeamRef = ref(db, `/users/${user.uid}/teams/${thisTeamUID}`);
    const [teamName, setTeamName] = useState(() => {
        if (!thisTeamRef) return 'Nem található ez a csapat';


        // const asd = get(child(db, `/users/${user.uid}/teams/`)).then((snapshot) => {return snapshot.val()});

        
        // console.log(asd);
        let name = '';
        onValue(thisTeamRef, (snapshot) => { name = snapshot.val().name });
        return name;
    });

    // console.log(thisUID);
    // console.log(thisTeamRef);

    function updateNameInDataBase(e) {
        console.log(e.target.value);
        set(thisTeamRef, {
            name: e.target.value
        });
        setTeamName(e.target.value);
    }

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
                    <h2>{teamName}</h2>
                </header>
                <div>
                    <input type='text' onChange={updateNameInDataBase} />
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    )
}
