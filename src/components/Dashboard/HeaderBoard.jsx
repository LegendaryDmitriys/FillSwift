import React from 'react';

import styles from "../../styles/headerboard.module.css"
function HeaderBoard(props) {
    const { title, description } = props;

    return (
        <div className={styles.headerboard}>
            <div className={styles["headerboard-container"]}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default HeaderBoard;