import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {isAuthenticated, logout} from "../../../utils/authUsers.js";
import axios from "axios";
import styles from "../../../styles/operatorsidebar.module.css";
import {ROUTES} from "../../../utils/routes.js";
import sprite from "../../../sprite.svg";
import {API} from "../../../utils/APi";

function OperatorSidebar(props) {
    const [userData, setUserData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated()) {
            axios.get(`${API}/api/user`, {
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
                <div>
                    <div
                        className={location.pathname === ROUTES.OperatorCars ? styles["item-container__activ"] : styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#car"}/>
                        </svg>
                        <Link to={ROUTES.OperatorCars}>Автомобили</Link>
                    </div>
                </div>
                <div>
                    <div
                        className={location.pathname === ROUTES.OperatorProducts ? styles["item-container__activ"] : styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#cards"}/>
                        </svg>
                        <Link to={ROUTES.OperatorProducts}>Товары</Link>
                    </div>
                </div>
                <div>
                    <div
                        className={location.pathname === ROUTES.OperatorRequests ? styles["item-container__activ"] : styles["item-container__setting"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#admin-response"}/>
                        </svg>
                        <Link to={ROUTES.OperatorRequests}>Запросы</Link>
                    </div>
                </div>
                <div>
                    <div
                        className={location.pathname === ROUTES.OperatorFuelStation ? styles["item-container__activ"] : styles["item-container__setting"]}>
                        <svg className={styles["nav-icon"]} width={25} height={25}>
                            <use xlinkHref={sprite + "#admin-fuelstation"}/>
                        </svg>
                        <Link to={ROUTES.OperatorFuelStation}>Заправки</Link>
                    </div>
                </div>
                <div>
                    <div
                        className={location.pathname === ROUTES.OperatorTypeFuels ? styles["item-container__activ"] : styles["item-container__setting"]}>
                        <svg className={styles["nav-icon"]} width={25} height={25}>
                            <use xlinkHref={sprite + "#admin-fueltype"}/>
                        </svg>
                        <Link to={ROUTES.OperatorTypeFuels}>Типы топлива</Link>
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

export default OperatorSidebar;
