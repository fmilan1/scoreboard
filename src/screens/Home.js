import React from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

export default function Home() {

    const user = JSON.parse(localStorage.getItem('user'));

    function writeToDatabase() {
        console.log(user.uid, user.email);
        set(ref(db, `/${user.uid}/hahahahahaha`), 'ez igazabol a nevem');
    }
    
    return (
        <div>
            <button onClick={writeToDatabase} >write</button>
        </div>
    )
}