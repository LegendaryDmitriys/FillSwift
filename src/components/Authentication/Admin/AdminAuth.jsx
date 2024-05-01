import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

const AdminAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const is_staff = response.data.user.is_staff;
            localStorage.setItem('token', token)
            if (is_staff) {
                toast.success('Вы успешно вошли как администратор');
                window.location.href = '/admin/customers';
            }

        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            setTimeout(() => {
                toast.error('Ошибка аутентификации: Неверный адрес электронной почты или пароль');
            }, 0);
        }

    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email"   onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default AdminAuth;
