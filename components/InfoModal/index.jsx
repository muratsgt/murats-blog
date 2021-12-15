import React from 'react';
import styles from "./style.module.scss";

// info modal pop up
export default function InfoModal({ title, message }) {

    return (
        <div className={styles.container}>
            <div className={styles.messagebox}>
                <span>{title}</span>
                <br /><br />
                {message}
            </div>
        </div>
    )
}
