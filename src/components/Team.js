import React from 'react';
import styles from '../screens/styles/Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Team({name, uid}) {

    const navigate = useNavigate();

    const thisTeamObj = {};
    
    return (
        <section className={styles.team} onClick={() => {
            navigate(`/csapat?${uid}`);
        }}>
            {name}
            <img className={styles.teamLogo} src="https://scontent.xx.fbcdn.net/v/t1.15752-9/416385981_1160666734911714_6105998791939796377_n.png?stp=dst-png_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=61f064&_nc_ohc=i-qZlXc46uQAX-CBIN6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSS7POnH8x8OORTme1L7omVJ888gASCRNBOKK4LDAAiHw&oe=65E097F1" />
        </section>
    )
}
