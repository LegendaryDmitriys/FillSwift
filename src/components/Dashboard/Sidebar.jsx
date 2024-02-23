import React from 'react';

import styles from "../../styles/sidebar.module.css"
import sprite from "../../sprite.svg";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes";


function Sidebar(props) {
    return (
        <div className={styles.sidebar}>
            <div className={styles['logo']}>
                <svg className='logo' width={134} height={51}>
                    <use xlinkHref={sprite + "#logo-full"}/>
                </svg>
            </div>
            <div className={styles["nav-menu"]}>
                <div className={styles["nav-item"]}>
                    <div className={styles["item-container__base"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#history-fuel"}/>
                        </svg>
                        <Link to={ROUTES.HistoryFuels}>История заправок</Link>
                    </div>
                </div>
                <div>
                    <div className={styles["item-container__activ"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#car"}/>
                        </svg>
                        <Link to={ROUTES.Cars}>Мое авто</Link>
                        <svg className={styles["icon-plus"]} width={12} height={12}>
                            <use xlinkHref={sprite + "#plus"}/>
                        </svg>
                    </div>
                </div>
                <div>
                    <div className={styles["item-container"]}>
                        <svg className={styles["nav-icon"]} width={24} height={24}>
                            <use xlinkHref={sprite + "#cards"}/>
                        </svg>
                        <Link to={ROUTES.Basket}>Корзина товаров</Link>
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
            </div>
            <div className={styles["profile"]}>
                <div className={styles["avatar"]}></div>
                <div className={styles["user-bio"]}>
                    <p className={styles["user-firstname"]}>Пользователь</p>
                    <p className={styles["user-lastname"]}>Пользователь</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;