import React from 'react';


import styles from "../../styles/auth.module.css"
import sprite from "../../sprite.svg";

const Auth = (props) => (
    <div className={styles.auth}>
        <div className={styles["auth-header"]}>
            <svg width={42} height={51}>
                <use xlinkHref={sprite + "#logo"}/>
            </svg>
            <h1>Войдите в свой аккаунт</h1>
            <form action="">
                <div className={styles["mail-container"]}>
                    <label for="mail">Адрес электронной почты *</label>
                    <input type="text" id="mail" rules={{require: "Обязательное поле!"}} required/>
                </div>
                <div className={styles["password-container"]}>
                    <label for="password">Пароль *</label>
                    <input type="password" id="password" rules={{require: "Обязательное поле!"}} required/>
                </div>
                <div className={styles["reset-password"]}>
                    <a href="">Забыли пароль?</a>
                </div>
                <div className={styles["login-btn"]}>
                    <button>Войти</button>
                </div>
                <div className={styles["transition-reg"]}>
                    <p>У вас еще нету аккаунта? <a href="">Начните здесь</a></p>
                </div>
            </form>
        </div>
    </div>

);

export default Auth;