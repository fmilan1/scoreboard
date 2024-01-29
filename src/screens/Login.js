import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import styles from './styles/Login.module.css';
import { auth, googleAuthProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Errors = {
    EmailAlreadyInUse: 'auth/email-already-in-use',
    EmailInvalid: 'auth/invalid-email',
    PasswordWeak: 'auth/weak-password',
    NoUser: 'auth/invalid-credential',
}

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    function handleErrors(error) {
        switch (error.code) {
            case Errors.EmailAlreadyInUse:
                setError('Ez az emailcím már használva van!');
                break;
            case Errors.EmailInvalid:
                setError('Az emailcím hibás!');
                break;
            case Errors.PasswordWeak:
                setError('A jelszó túl gyenge!');
                break;
            case Errors.NoUser:
                setError('Hibás emailcím vagy jelszó!');
                break;
            default:
                setError('Ismeretlen hiba történt!');
                break;
        }
        setShowError(true);
    }

    async function signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            localStorage.setItem('token', result.user.accessToken);
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    async function createUserWithEmail() {
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('token', credential.user.accessToken);
            localStorage.setItem('user', JSON.stringify(credential.user));
            navigate('/');
        } catch (error) {
            handleErrors(error);
        }
    }
    
    async function singnInWithEmail() {
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('token', credential.user.accessToken);
            localStorage.setItem('user', JSON.stringify(credential.user));
            navigate('/');
        } catch (error) {
            console.log(error.code);   
            handleErrors(error);
        }
    }

    return (
        <main className={styles.mainContainer} >
            <div className={`${styles.outerContainer} ${showForm && styles.slide}`} >
                <div className={styles.loginProviderContainer} >
                    <h3>Válasszon egy opciót a bejelentkezéshez!</h3>
                    <GoogleButton label='Google' onClick={signInWithGoogle} />
                    <button onClick={() => setShowForm(true)} >Email</button>
                </div>

                <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    if (!isSigningUp) singnInWithEmail();
                    else createUserWithEmail();
                }}>                
                    <svg className={styles.backButton} onClick={() => setShowForm(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    <div className={styles.formContainer}>

                        {showError && <div className={styles.errorLabel}>{error}</div>}

                        <div className={styles.input}>
                            <input type='email' required placeholder='' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className={styles.placeHolder} >Email</span>
                        </div>

                        <div className={styles.input}>
                            <input type='password' required placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className={styles.placeHolder} >Jelszó</span>
                        </div>

                        {isSigningUp &&
                            <div className={styles.input}>
                                <input type='password' required placeholder='' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                <span className={styles.placeHolder} >Jelszó újra</span>
                            </div>
                        }

                        <button type='submit' >{!isSigningUp ? 'Bejelentkezés' : 'Regisztráció'}</button>

                        <div className={styles.switchButton} onClick={() => {
                            setIsSigningUp(!isSigningUp);
                            setShowError(false);
                            setPassword('');
                            setRepeatPassword('');
                        }}>{isSigningUp ? 'Bejelentkezés' : 'Regisztráció'}</div>

                    </div>
                </form>
            </div>
        </main>
    )
}
