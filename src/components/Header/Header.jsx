import React, { useState } from 'react';
import styles from "../../styles/header.module.css"
import sprite  from "../../sprite.svg"
import BurgerMenu from "./Burger.jsx";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";
import {isAuthenticated} from "../../utils/authUsers.js";

const Header = (props) => {
    const [activeMenuItem, setActiveMenuItem] = useState('Главная');
    const location = useLocation();

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };


    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <div>
                    <Link to={ROUTES.Home}>
                        <svg className='logo' width={134} height={51}>
                            <use xlinkHref={sprite + "#logo-full"}/>
                        </svg>
                    </Link>
                </div>
                <div className={styles.menu}>
                    <ul className={styles["menu-items"]}>
                        <li
                            key="Главная"
                            className={location.pathname === ROUTES.Home ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Главная')}
                        >
                            <Link to={ROUTES.Home}>Главная</Link>
                        </li>
                        <li
                            key="Заправиться"
                            className={location.pathname === ROUTES.Fueling ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Заправиться')}
                        >
                            <Link to={ROUTES.Fueling}>Заправиться</Link>
                        </li>
                        <li
                            key="Магазин"
                            className={location.pathname === ROUTES.Shop ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Магазин')}
                        >
                            <Link to={ROUTES.Shop}>Магазин</Link>
                        </li>
                        <li
                            key="Типы топлива"
                            className={location.pathname === ROUTES.TypeFuels ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Типы топлива')}
                        >
                            <Link to={ROUTES.TypeFuels}>Типы топлива</Link>
                        </li>
                        <li
                            key="Контакты"
                            className={location.pathname === ROUTES.Contact ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Контакты')}
                        >
                            <Link to={ROUTES.Contact}>Контакты</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className={styles.person}>
                        <button>
                            {isAuthenticated() ? (
                                <Link to={ROUTES.Settings}>Личный кабинет</Link>
                            ) : (
                                <Link to={ROUTES.Login}>
                                    <svg className={styles.sign} width={32} height={32}>
                                        <use xlinkHref={sprite + "#sign"}/>
                                    </svg>
                                </Link>
                            )}
                        </button>
                    </div>
                    <div className={styles.burger}>
                    <BurgerMenu/>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
