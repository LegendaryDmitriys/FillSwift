import React from 'react';

import styles from "../../styles/registration.module.css"
import sprite from "../../sprite.svg";

const Registration = (props) => (
    <div className={styles.registration}>
        <div className={styles["reg-form"]}>
            <div className={styles["reg-header"]}>
                <svg width={42} height={51}>
                    <use xlinkHref={sprite + "#logo"}/>
                </svg>
                <h1>Создайте свой аккаунт</h1>
                <form action="">
                    <div className={styles["bio-container"]}>
                        <div className={styles["name-container"]}>
                            <label htmlFor="firstname">Имя *</label>
                            <input type="text" id="firstname" rules={{require: "Обязательное поле!"}} required/>
                        </div>
                        <div className={styles["lastname-container"]}>
                            <label htmlFor="lastname">Фамилия *</label>
                            <input type="text" id="lastname" rules={{require: "Обязательное поле!"}} required/>
                        </div>
                    </div>
                    <div className={styles["mail-container"]}>
                        <label htmlFor="mail">Адрес электронной почты *</label>
                        <input type="text" id="mail" rules={{require: "Обязательное поле!"}} required/>
                    </div>
                    <div className={styles["password-container"]}>
                        <label htmlFor="password">Пароль *</label>
                        <input type="password" id="password" rules={{require: "Обязательное поле!"}} required/>
                    </div>
                    <div className={styles["reg-btn"]}>
                        <button>Регистрация</button>
                    </div>
                    <div className={styles["transition-log"]}>
                        <p>У вас уже есть аккаунт? <a href="">Вход в систему</a></p>
                    </div>
                </form>
            </div>
        </div>
        <div className={styles["reg-info"]}>
            <h2>Приветствуем тебя на нашей АЗС!</h2>
            <p>
                Зарегистрируйся сейчас, чтобы получить доступ к удобному и быстрому заправочному сервису.
                Присоединяйся к нашему сообществу автолюбителей и получи доступ к специальным предложениям и акциям.
                Регистрация займет всего несколько мгновений. Присоединяйся и начни экономить время и деньги с нами!
            </p>
        </div>
    </div>
);

export default Registration;