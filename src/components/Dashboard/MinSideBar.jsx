import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import sprite from "../../sprite.svg";

import "../../styles/minsidebar.css"
import styles from "../../styles/sidebar.module.css";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";


const MinSideBar = () => {
    return (
        <Menu
            noOverlay
            right
            customBurgerIcon={<svg className='icon' width={24} height={24}
            >
                <use xlinkHref={sprite + "#min-sidebar"}/>
            </svg>}
            burgerButtonClassName={"bm-button"}
        >
            <svg className='icon-logo' width={134} height={51} id="logo">
                <use xlinkHref={sprite + "#logo"}/>
            </svg>
            <div className={styles["item-container__base"]}>
                <svg className={styles["nav-icon"]} width={24} height={24}>
                    <use xlinkHref={sprite + "#history-fuel"}/>
                </svg>
                <Link to={ROUTES.Settings}>История заправок</Link>
            </div>
            <div className={styles["item-container__activ"]}>
                <svg className={styles["nav-icon"]} width={24} height={24}>
                    <use xlinkHref={sprite + "#car"}/>
                </svg>
                <Link to={ROUTES.Settings}>Мое авто</Link>
                <svg className={styles["icon-plus"]} width={12} height={12}>
                    <use xlinkHref={sprite + "#plus"}/>
                </svg>
            </div>
            <div>
                <div className={styles["item-container"]}>
                    <svg className={styles["nav-icon"]} width={24} height={24}>
                        <use xlinkHref={sprite + "#cards"}/>
                    </svg>
                    <Link to={ROUTES.Settings}>Корзина товаров</Link>
                </div>
            </div>
            <div>
                <div className={styles["item-container"]}>
                    <svg className={styles["nav-icon"]} width={24} height={24}>
                        <use xlinkHref={sprite + "#bonus"}/>
                    </svg>
                    <Link to={ROUTES.Settings}>Бонусная программа</Link>
                </div>
            </div>
            <div>
                <div className={styles["item-container__setting"]}>
                    <svg className={styles["nav-icon"]} width={25} height={25}>
                        <use xlinkHref={sprite + "#setting"}/>
                    </svg>
                    <Link to={ROUTES.Settings}>Настройки</Link>
                </div>
            </div>
        </Menu>
    );
};

export default MinSideBar;
