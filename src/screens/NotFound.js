import React from 'react';
import styles from './styles/NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1>404</h1>
            <div>Az oldal nem található!</div>
        </div>
    )
}
