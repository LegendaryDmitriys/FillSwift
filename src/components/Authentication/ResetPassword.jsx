import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/resetpassword.module.css';
import { ROUTES } from "../../utils/routes.js";
import {Link, useNavigate} from "react-router-dom";
import {API} from "../../utils/APi";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
    const navigate = useNavigate();

    const handleGenerateCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API}/api/reset-password/generate-code/`,
                { email: email }
            );
            setMessage(response.data.message);
            setShowCodeInput(true);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API}/api/reset-password/verify-code/`,
                { email: email, code: code, new_password: newPassword }
            );
            setMessage(response.data.message);
            setShowCodeInput(false);
            setShowNewPasswordInput(true);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API}/api/reset-password/reset/`,
                { email: email, new_password: newPassword }
            );
            setMessage(response.data.message);
            setShowNewPasswordInput(false);
            navigate(ROUTES.Login)
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className={styles["reset-password-container"]}>
            <div className={styles["reset-password"]}>
                <h2>Сбросить пароль</h2>
                <form onSubmit={handleGenerateCode} className={styles.form}>
                    <label htmlFor="email">Введите ваш email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className={styles["send-code-btn"]}>Отправить код для сброса пароля</button>
                    <button className={styles["back-to-auth"]}><Link to={ROUTES.Login}>Вернуться назад</Link></button>

                </form>

                {showCodeInput && (
                    <div className={styles["modal"]}>
                        <form onSubmit={handleVerifyCode} className={styles.form}>
                            <label htmlFor="code">Введите код для сброса пароля:</label>
                            <input
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button type="submit" className={styles.button}>Подтвердить код</button>
                        </form>
                    </div>
                )}

                {showNewPasswordInput && (
                    <div className={styles["modal"]}>
                        <form onSubmit={handleResetPassword} className={styles.form}>
                            <label htmlFor="newPassword">Введите новый пароль:</label>
                            <input
                                type="text"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type="submit" className={styles.button}>Сбросить пароль</button>
                        </form>
                    </div>
                )}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
