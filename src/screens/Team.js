import React, { useEffect, useState } from 'react';
import styles from './styles/Home.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

import { db, user } from '../firebase';
import { ref, onValue, set } from 'firebase/database';

export default function Team() {

    const location = useLocation();
    const navigate = useNavigate();

    const selectedTeamUID = location.search.replace('?', '');
    const selectedTeamRef = ref(db, `/users/${user.getUser.uid}/teams/${selectedTeamUID}`);

    const [selectedTeamObj, setSelectedTeamObj] = useState(() => {
        // const name = selectedTeamRef
        // console.log(name);


        return 'Nem található ez a csapat';



    });

    useEffect(() => {
        onValue(selectedTeamRef, snapshot => {
            setSelectedTeamObj(snapshot.exportVal());
        });
    }, []);

    function updateNameInDataBase(e) {
        set(selectedTeamRef, {
            name: e.target.value,
            uid: selectedTeamUID
        });
        setSelectedTeamObj({...selectedTeamObj, name: e.target.value});
    }

    return (
        <>
            <header className={styles.header}>
                <h2>Üdv{user.getUser.displayName ? `, ${user.getUser.displayName}` : `, ${user.getUser.email}`}!</h2>
                <i className={`fa-regular fa-user ${styles.button} ${styles.profileBtn}`} onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/belepes/');
                }}></i>
            </header>
            <main className={styles.mainContainer}>
                <header className={styles.mainHeader}>
                    <i className={`${styles.button} fa-solid fa-arrow-left`} onClick={() => navigate('../')}></i>
                    <h2>{selectedTeamObj.name}</h2>
                    <i className={`${styles.button} fa-solid fa-trash`} onClick={() => {
                        navigate('/');
                        set(selectedTeamRef, null);
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
