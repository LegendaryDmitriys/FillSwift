import React from 'react';

import styles from "../../styles/dashboard.module.css"
import sprite from "../../sprite.svg";

import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";
import BurgerMenu from "../Header/Burger";
import MinSideBar from "./MinSideBar";

function DashboardHistoryFuels(props) {
    return (
        <div className={styles.dashboard}>
            <div>
               <Sidebar/>
            </div>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"История заправок"} description={"Здесь отображаются ваша история топливных операций "}/>
                <div className={styles["history-fuels"]}>
                    <table >
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Дата и время</th>
                                <th>Количество топлива</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Без названия</td>
                            <td>17:55 07.02.2024</td>
                            <td>50 л</td>
                            <td>
                                <svg className={styles["nav-icon"]} width={22} height={26}>
                                    <use xlinkHref={sprite + "#check"}/>
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td>Без названия</td>
                            <td>17:55 07.02.2024</td>
                            <td>50 л</td>
                            <td>
                                <svg className={styles["nav-icon"]} width={22} height={26}>
                                    <use xlinkHref={sprite + "#check"}/>
                                </svg>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.burger}>
                    <MinSideBar/>
                </div>
            </div>
        </div>
    );
}

export default DashboardHistoryFuels;