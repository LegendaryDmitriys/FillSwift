import React, { useState } from 'react';
import styles from "../../styles/dashboardsetting.module.css";
import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";

function DashboardSettings(props) {
    const [selectedCategory, setSelectedCategory] = useState("settings");

    return (
        <div className={styles.dashboard}>
            <div>
                <Sidebar/>
            </div>
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
                            <form action="">
                                <div className={styles["setting-firstname"]}>
                                    <label htmlFor="">Имя*</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles["setting-lastname"]}>
                                    <label htmlFor="">Фамилия*</label>
                                    <input type="text" required/>
                                </div>
                            </form>
                            <button>Сохранить</button>
                        </div>
                        <div className={styles["settings-password"]}>
                            <article>
                                <h2>Авторизация</h2>
                                <p>Обновить пароль</p>
                            </article>
                            <form action="">
                                <div className={styles["setting-newpass"]}>
                                    <label htmlFor="">Новый пароль*</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles["setting-oldpass"]}>
                                    <label htmlFor="">Старый пароль*</label>
                                    <input type="text" required/>
                                </div>
                            </form>
                            <button>Сохранить</button>
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
