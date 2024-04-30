import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/auth.module.css';
import sprite from '../../sprite.svg';
import { ROUTES } from '../../utils/routes';
import { toast } from 'react-toastify';
import '../../styles/toastify.css'

const Auth = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://192.168.0.106:8000/api/users/login/',
                {
                    user: {
                        email,
                        password
                    }
                },
            );
            const token = response.data.user.token;
            localStorage.setItem('token', token)
            toast.success('Аутентификация успешна');
            window.location.href = '/user/settings';
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
                    <div className={styles['reset-password']}>
                        <Link to={ROUTES.ResetPassword}>Забыли пароль?</Link>
                    </div>
                    <div className={styles['login-btn']}>
                        <button type="submit">Войти</button>
                    </div>
                    <div className={styles['transition-reg']}>
                        <p>
                            У вас еще нету аккаунта?{' '}
                            <Link to={ROUTES.Registration}>Начните здесь</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
