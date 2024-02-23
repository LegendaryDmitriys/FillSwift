import React, { useState } from 'react';
import styles from "../../styles/header.module.css"
import sprite  from "../../sprite.svg"
import BurgerMenu from "./Burger";
import { Link } from 'react-router-dom'
import {ROUTES} from "../../utils/routes";

const Header = (props) => {
    const [activeMenuItem, setActiveMenuItem] = useState('Главная');

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <div>
                    <svg className='icon' width={134} height={51}>
                        <use xlinkHref={sprite + "#logo-full"}/>
                    </svg>
                </div>
                <div className={styles.menu}>
                    <ul className={styles["menu-items"]}>
                        <li
                            className={activeMenuItem === 'Главная' ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Главная')}
                        >
                            <Link to={ROUTES.Home}>Главная</Link>
                        </li>
                        <li
                            className={activeMenuItem === 'Заправиться' ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Заправиться')}
                        >
                            <Link to="#">Заправиться</Link>
                        </li>
                        <li
                            className={activeMenuItem === 'Магазин' ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Магазин')}
                        >
                            <Link to={ROUTES.Shop}>Магазин</Link>
                        </li>
                        <li
                            className={activeMenuItem === 'Типы топлива' ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Типы топлива')}
                        >
                            <Link to="#">Типы топлива</Link>
                        </li>
                        <li
                            className={activeMenuItem === 'Контакты' ? styles["menu-item-activ"] : styles["menu-item"]}
                            onClick={() => handleMenuItemClick('Контакты')}
                        >
                            Контакты
                        </li>
                    </ul>
                </div>
                <div>
                    <div className={styles.person}>

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
