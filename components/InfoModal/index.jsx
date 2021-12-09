import React from 'react';
import styles from "./style.module.scss";

// cards for posts, below of homepage
export default function InfoModal({ }) {

    return (
        <div className={styles.container}>
            <div className={styles.messagebox}>
                <span>saving ...</span>
                <br /><br />
                We will publish your post after review.
                Thank you for your contribution 😊
            </div>
        </div>
    )
}
