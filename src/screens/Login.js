import React from 'react';
import GoogleButton from 'react-google-button';
import styles from './styles/Login.module.css';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithRedirect, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    async function signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            console.log(result);
            localStorage.setItem('token', result.user.accessToken);
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    
    
    return (
        <main
            className={styles.mainContainer}
        >
            <div
                className={styles.loginProviderContainer}
            >
                <h3>Válasszon egy opciót a bejelentkezéshez!</h3>
                <GoogleButton label='Bejelentkezés' onClick={signInWithGoogle} />
            </div>
        </main>
    )
}
