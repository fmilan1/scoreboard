import React, { useState } from 'react';
import styles from './styles/Home.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

import { db, user } from '../firebase';
import { uid } from 'uid';
import { child, get, onValue, ref, set } from 'firebase/database';
import { doc } from 'firebase/firestore';

export default function Teams() {

    const location = useLocation();
    const navigate = useNavigate();

    const selectedTeamUID = location.search.replace('?', '');
    const selectedTeamDoc = doc(db, 'teams', selectedTeamUID);

    const [selectedTeamName, setSelectedTeamName] = useState(() => {
        // const name = selectedTeamRef
        // console.log(name);
        
        
        return 'Nem található ez a csapat';

        

    });

    function updateNameInDataBase(e) {
        
        setSelectedTeamName(e.target.value);
    }

    return (
        <>
            <header className={styles.header}>
                <h2>{selectedTeamName}</h2>
                <i className={`fa-regular fa-user ${styles.button} ${styles.profileBtn}`} onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/belepes/');
                }}></i>
            </header>
            <main className={styles.mainContainer}>
                <header className={styles.mainHeader}>
                    <i className={`${styles.button} fa-solid fa-arrow-left`} onClick={() => navigate('../')}></i>
                    <h2>{selectedTeamName}</h2>
                    <i className={`${styles.button} fa-solid fa-trash`} onClick={() => {
                        navigate('/');
                        // set(selectedTeamRef, null);
                    }}></i>
                </header>
                <div className={styles.contentContainer}>
                    <input type='text' onChange={updateNameInDataBase} />
                </div>
            </main>
            <footer className={styles.footer}>
                <h6>fazekas.milan1@gmail.com</h6>
            </footer>
        </>
    );
}
