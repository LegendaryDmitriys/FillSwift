import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import styles from '../../../styles/customersdetail.module.css';
import sprite from "../../../sprite.svg";

function CustomersDetail(props) {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: ''
    });
    const { userId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, carsResponse] = await Promise.all([
                    axios.get(`http://192.168.0.106:8000/api/users/${userId}`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }),
                    axios.get(`http://192.168.0.106:8000/cars/user/${userId}`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    })
                ]);

                setUser(userResponse.data);
                setCars(carsResponse.data);
                setFormData({
                    email: userResponse.data.email,
                    firstname: userResponse.data.firstname,
                    lastname: userResponse.data.lastname,
                    username: userResponse.data.username
                });
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();

    }, [userId, token]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleCancelEditButtonClick = () => {
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://192.168.0.106:8000/api/users/${userId}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    };

    if (!user) {
        return <div>Загрузка информации о пользователе...</div>;
    }

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`http://192.168.0.106:8000/api/users/${userId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setUser(null);
        } catch (error) {
            console.error('Ошибка при удалении аккаунта:', error);
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post(`http://192.168.0.106:8000/api/reset-password-admin/`, { user_id: userId }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

        } catch (error) {
            console.error('Ошибка при восстановлении пароля:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["header-bio"]}>
                <div className={styles['right-container']}>
                    <svg className='logo' width={60} height={60}>
                        <use xlinkHref={sprite + "#customer-icon"}/>
                    </svg>
                    <article>
                        <h2>{user.email}</h2>
                        <p>user_id <strong>{user.id}</strong></p>
                    </article>
                </div>
                <div className={styles['left-container']}>
                    <div className={styles['left-container']}>
                        <button onClick={handleEditButtonClick} className={styles['edit-customers']}>Редактировать
                            <svg className='logo' width={24} height={24}>
                                <use xlinkHref={sprite + "#pencil-icon"}/>
                            </svg>
                        </button>
                        <button className={styles['actions-customers']}>Действия</button>
                    </div>
                </div>
            </div>
            <h2 className={styles.title}>Детали пользователя</h2>
            <h3 className={styles.subtitle}>Основные детали</h3>
            <form onSubmit={handleSubmit} className={styles['base-bio']}>
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleInputChange}
                       readOnly={!isEditing}/>
                <label>Имя:</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange}
                       readOnly={!isEditing}/>
                <label>Фамилия:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}
                       readOnly={!isEditing}/>
                <label>Ник:</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange}
                       readOnly={!isEditing}/>
                {isEditing && (
                    <>
                        <button type="button" onClick={handleCancelEditButtonClick}>Отменить</button>
                        <button type="submit">Сохранить</button>
                    </>
                )}
            </form>
            <div className={styles['car-list-container']}>
                <p>Автомобили во владении:</p>
                <ul className={styles['car-list']}>
                    {cars.map(car => (
                        <li key={car.id}>
                            <p>Регистрационный номер: {car.registration_number}</p>
                            <p>Марка: {car.brand_name}</p>
                            <p>Модель: {car.model_name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleResetPassword} className={styles['reset-password_btn']}>Восстановить пароль</button>
            <div className={styles['action-block']}>
                <h2>Почта</h2>
                <a href={`mailto:${user.email}`}>Отправить письмо</a>
            </div>
            <div className={styles['delete-block']}>
                <h2>Управление данными</h2>
                <button onClick={handleDeleteAccount}>Удалить аккаунт</button>
            </div>
        </div>
    );
}

export default CustomersDetail;
