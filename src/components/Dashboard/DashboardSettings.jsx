import React, {useEffect, useState} from 'react';
import styles from "../../styles/dashboardsetting.module.css";
import HeaderBoard from "./HeaderBoard.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {isAuthenticated} from "../../utils/authUsers.js";
import {API} from "../../utils/APi";


function DashboardSettings(props) {
    const [userData, setUserData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("settings");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [totalSpentData, setTotalSpentData] = useState([]);
    const [totalRefueledData, setTotalRefueledData] = useState([]);

    useEffect(() => {
        if (isAuthenticated()) {
            axios.get(`${API}/api/user`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setUserData(response.data);
                    setTotalSpentData(response.data.user.total_spent)
                    setTotalRefueledData(response.data.user.total_refueled)
                })
                .catch(error => {
                    console.error('Ошибка получения данных пользователя:', error);
                });
        }
    }, []);

    const handleSubmitFirstNameLastName = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Token ${token}`
        };

        const formData = {
            user: {
                lastname: lastName,
                firstname: firstName
            }
        };

        axios.put(`${API}/api/user`, formData, { headers })
            .then(response => {
                console.log(response.data);
                toast.success("Данные успешно поменяны!")
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Token ${token}`
        };

        const formData = {
            user:{
                password: newPassword
            }
        };

        axios.put(`${API}/api/user`, formData, { headers })
            .then(response => {
                console.log(response.data);
                toast.success('Пароль успешно поменян!')
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    };


    return (
        <div className={styles.dashboard}>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"Настройки"} description={""}/>
                <div className={styles["nav-menu"]}>
                    <span className={selectedCategory === "settings" ? styles["selected"] : ""}
                          onClick={() => setSelectedCategory("settings")}>Настройки</span>
                    <span className={selectedCategory === "statistics" ? styles["selected"] : ""}
                          onClick={() => setSelectedCategory("statistics")}>Статистика и использование</span>
                </div>
                {selectedCategory === "settings" && (
                    <div className={styles["settings"]}>
                        <div className={styles["setting-bio"]}>
                            <article>
                                <h2>Личная информация</h2>
                                <p>Расскажите нам немного о себе</p>
                            </article>
                            <form onSubmit={handleSubmitFirstNameLastName}>
                                <div className={styles["setting-firstname"]}>
                                    <label htmlFor="">Имя*</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                </div>
                                <div className={styles["setting-lastname"]}>
                                    <label htmlFor="">Фамилия*</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                </div>
                            </form>
                            <button onClick={handleSubmitFirstNameLastName}>Сохранить</button>
                        </div>
                        <div className={styles["settings-password"]}>
                            <article>
                                <h2>Авторизация</h2>
                                <p>Обновить пароль</p>
                            </article>
                            <form onSubmit={handleSubmitPassword}>
                                <div className={styles["setting-newpass"]}>
                                    <label htmlFor="">Новый пароль*</label>
                                    <input type="text" value={newPassword}
                                           onChange={(e) => setNewPassword(e.target.value)} required/>
                                </div>
                                <div className={styles["setting-oldpass"]}>
                                    <label htmlFor="">Старый пароль*</label>
                                    <input type="text" value={oldPassword}
                                           onChange={(e) => setOldPassword(e.target.value)} required/>
                                </div>
                            </form>
                            <button onClick={handleSubmitPassword}>Сохранить</button>
                        </div>
                    </div>
                )}
                {selectedCategory === "statistics" && (
                    <div className={styles.statistics}>
                        <div className={styles["statistics-graphics"]}>
                        </div>
                        <div className={styles["statistics-text"]}>
                            <h2>Информация</h2>
                        {userData && (
                            <div className={styles["statistics-text__container"]}>
                                <div className={styles["statistics-text__item"]}>
                                    <article>
                                        <p>Потрачено Р</p>
                                        <span>{userData.user.total_spent}</span>
                                    </article>
                                </div>
                                <div className={styles["statistics-text__item"]}>
                                    <article>
                                        <p>Залито топлива</p>
                                        <span>{userData.user.total_refueled}</span>
                                    </article>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardSettings;