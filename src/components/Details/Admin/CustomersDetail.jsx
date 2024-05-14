import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import styles from '../../../styles/customersdetail.module.css';
import sprite from "../../../sprite.svg";
import {API} from "../../../utils/APi";

function CustomersDetail(props) {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        username: '',
        operator: false
    });
    const { userId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, carsResponse] = await Promise.all([
                    axios.get(`${API}/api/users/${userId}`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }),
                    axios.get(`${API}/cars/user/${userId}`, {
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
                    username: userResponse.data.username,
                    operator: userResponse.data.operator
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
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
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
            const response = await axios.put(`${API}/api/users/${userId}/`, formData, {
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
            await axios.delete(`${API}/api/users/${userId}`, {
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
            await axios.post(`${API}/api/reset-password-admin/`, { user_id: userId }, {
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
                    <img className={styles["user-avatar"]} src={user.avatar} alt=""/>
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
                    </div>
                </div>
            </div>
            <div className={styles.rows}>
                <div className={styles['rows-left']}>
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
                        <label>Статус оператора:</label>
                        <select
                            name="operator"
                            value={formData.operator}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            disabled={!isEditing}
                        >
                            <option value={true}>Да</option>
                            <option value={false}>Нет</option>
                        </select>

                        {isEditing && (
                            <>

                                <button type="button" onClick={handleCancelEditButtonClick}>Отменить</button>
                                <button type="submit">Сохранить</button>
                            </>
                        )}
                    </form>
                    <div className={styles['car-list-container']}>
                        <h4>Автомобили во владении:</h4>
                        <ul className={styles['car-list']}>
                            {cars && cars.map(car => (
                                <li key={car.id}>
                                    <p>Регистрационный номер: {car.registration_number}</p>
                                    <p>Марка: {car.brand_name}</p>
                                    <p>Модель: {car.model_name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleResetPassword} className={styles['reset-password_btn']}>Восстановить пароль
                    </button>
                </div>
                <div className={styles["rows-right"]}>
                    <div className={styles['action-block']}>
                        <h4>Почта</h4>
                        <a href={`mailto:${user.email}`}>Отправить письмо</a>
                    </div>
                    <div className={styles['delete-block']}>
                        <h5>Управление данными</h5>
                        <button onClick={handleDeleteAccount}>Удалить аккаунт</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomersDetail;
