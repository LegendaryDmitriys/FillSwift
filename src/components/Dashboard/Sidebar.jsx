import React, {useEffect, useState} from 'react';

import styles from "../../styles/sidebar.module.css"
import sprite from "../../sprite.svg";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";
import {isAuthenticated, logout} from "../../utils/authUsers.js";
import axios from "axios";

function Sidebar(props) {
    const [userData, setUserData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated()) {
            axios.get('http://192.168.0.106:8000/api/user', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Ошибка получения данных пользователя:', error);
                });
        }
    }, []);


    const handleLogout = () => {
        logout();
    };


    console.log(userData)

    return (
        <div className={styles.sidebar}>
            <div className={styles['logo']}>
                <Link to={ROUTES.Home}>
                    <svg className='logo' width={134} height={51}>
                        <use xlinkHref={sprite + "#logo-full"}/>
                    </svg>
                </Link>
            </div>
            <div className={styles["nav-menu"]}>
                <div className={styles["nav-item"]}>
                <div className={location.pathname === ROUTES.HistoryFuels ? styles["item-container__activ"] : styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#history-fuel"}/>
                        </svg>
                        <Link to={ROUTES.HistoryFuels}>История заправок</Link>
                    </div>
                </div>
                <div>
                    <div className={location.pathname === ROUTES.Cars ? styles["item-container__activ"] : styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#car"}/>
                        </svg>
                        <Link to={ROUTES.Cars}>Мое авто
                            <svg className={styles["icon-plus"]} width={12} height={12}>
                                <use xlinkHref={sprite + "#plus"}/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className={location.pathname === ROUTES.Basket ? styles["item-container__activ"] : styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#cards"}/>
                        </svg>
                        <Link to={ROUTES.Basket}>Моя корзина</Link>

                    </div>
                </div>
                <div>
                    <div
                        className={location.pathname === ROUTES.Settings ? styles["item-container__activ"] : styles["item-container__setting"]}>
                        <svg className={styles["nav-icon"]} width={25} height={25}>
                            <use xlinkHref={sprite + "#setting"}/>
                        </svg>
                        <Link to={ROUTES.Settings}>Настройки</Link>
                    </div>
                </div>
                <div>
                    <div className={styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#logaut"}/>
                        </svg>
                        <button onClick={handleLogout}>Выход</button>
                    </div>
                </div>

            </div>
            {userData && (
                <div className={styles["profile"]}>
                    <div className={styles["avatar"]}>
                        <img src={userData.user.avatar} alt=""/>
                    </div>
                    <div className={styles["user-bio"]}>
                        <p className={styles["user-firstname"]}>{userData.user.firstname}</p>
                        <p className={styles["user-lastname"]}>{userData.user.lastname}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;