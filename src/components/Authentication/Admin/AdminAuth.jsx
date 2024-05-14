import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";
import styles from "../../../styles/auth.module.css";
import sprite from "../../../sprite.svg";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../../utils/routes";
import {API} from "../../../utils/APi";

const AdminAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API}/api/users/login/`,
                {
                    user: {
                        email,
                        password
                    }
                },
            );
            const { token, is_staff } = response.data.user;
            localStorage.setItem('token', token)
            localStorage.setItem('isStaff', is_staff);
            if (is_staff) {
                toast.success('Вы успешно вошли как администратор');
                navigate(ROUTES.AdminDashboard)
            }

        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            setTimeout(() => {
                toast.error('Ошибка аутентификации: Неверный адрес электронной почты или пароль');
            }, 0);
        }

    };

    return (
        <div className={styles.auth}>
            <div className={styles['auth-header']}>
                <svg width={42} height={51}>
                    <use xlinkHref={`${sprite}#logo`} />
                </svg>
                <h1>Войдите в свой аккаунт</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles['mail-container']}>
                        <label htmlFor="mail">Адрес электронной почты *</label>
                        <input
                            type="text"
                            id="email"
                            rules={{require: 'Обязательное поле!'}}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles['password-container']}>
                        <label htmlFor="password">Пароль *</label>
                        <input
                            type="password"
                            id="password"
                            rules={{require: 'Обязательное поле!'}}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles['login-btn']}>
                        <button type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;
