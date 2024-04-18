import React, {useState} from 'react';

import styles from "../../styles/registration.module.css"
import sprite from "../../sprite.svg";
import axios from "axios";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes";

const Registration = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const csrfToken = getCSRFToken();
            const response = await axios.post(
                'http://192.168.0.106:8000/api/users/',
                {
                    user: {
                        lastname,
                        firstname,
                        email,
                        username,
                        password
                    }
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken
                    }
                }
            );
            console.log(response.data);
            // Обработка успешной регистрации, например, перенаправление на другую страницу
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const getCSRFToken = () => {
        const csrfCookie = document.cookie.match(/csrftoken=([^;]*)/);
        return csrfCookie ? csrfCookie[1] : null;
    };

    return (
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
                                <input
                                    type="text"
                                    id="firstname"
                                    required
                                    onChange={(e) => setFirstname(e.target.value)}
                                    />
                            </div>
                            <div className={styles["lastname-container"]}>
                                <label htmlFor="lastname">Фамилия *</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    rules={{require: "Обязательное поле!"}}
                                    required
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles["username-container"]}>
                            <label htmlFor="username">Никнейм *</label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles["mail-container"]}>
                            <label htmlFor="mail">Адрес электронной почты *</label>
                            <input
                                type="text"
                                id="mail"
                                onChange={(e) => setEmail(e.target.value)}
                                required

                            />
                        </div>
                        <div className={styles["password-container"]}>
                            <label htmlFor="password">Пароль *</label>
                            <input
                                type="password"
                                id="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["reg-btn"]} onClick={handleSubmit}>
                            <button>Регистрация</button>
                        </div>
                        <div className={styles["transition-log"]}>
                            <p>У вас уже есть аккаунт? <Link to={ROUTES.Login}>Вход в систему</Link></p>
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
}

export default Registration;