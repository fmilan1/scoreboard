import React from 'react';
import styles from '../screens/styles/Login.module.css';

export default function InputComponent({type, value, onChange, placeHolder}) {
    return (
        <div className={styles.input}>
            <input type={type} required placeholder='' value={value} onChange={onChange} />
            <span className={styles.placeHolder} >{placeHolder}</span>
        </div>
    )
}
