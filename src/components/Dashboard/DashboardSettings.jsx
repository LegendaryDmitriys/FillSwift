import React, { useState } from 'react';
import styles from "../../styles/dashboardsetting.module.css";
import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";
import axios from "axios";


function DashboardSettings(props) {
    const [selectedCategory, setSelectedCategory] = useState("settings");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

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

        axios.put(`http://localhost:8000/api/user`, formData, { headers })
            .then(response => {
                console.log(response.data);
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

        axios.put(`http://localhost:8000/api/user`, formData, { headers })
            .then(response => {
                console.log(response.data);
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
                            <div className={styles["statistics-text__container"]}>
                                <div className={styles["statistics-text__item"]}>
                                    <article>
                                        <p>Потрачено Р</p>
                                        <span>10 000</span>
                                    </article>
                                </div>
                                <div className={styles["statistics-text__item"]}>
                                    <article>
                                        <p>Залито топлива</p>
                                        <span>500</span>
                                    </article>
                                </div>
                                <div className={styles["statistics-text__item"]}>
                                    <article>
                                        <p>Cэкономлено</p>
                                        <span>200</span>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardSettings;