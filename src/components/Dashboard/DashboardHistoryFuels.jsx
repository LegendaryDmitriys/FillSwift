import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from "../../styles/dashboard.module.css";
import sprite from "../../sprite.svg";

import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";
import BurgerMenu from "../Header/Burger";
import MinSideBar from "./MinSideBar";
import {isAuthenticated} from "../../utils/authUsers";

function DashboardHistoryFuels(props) {
    const [refuelings, setRefuelings] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuthenticated()) {
            async function fetchData() {
                try {
                    const userResponse = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setUserData(userResponse.data);

                    const refuelingsResponse = await axios.get(`http://localhost:8000/refuling/refuelings/${userResponse.data.user.id}/`);
                    setRefuelings(refuelingsResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            fetchData();
        }
    }, []);


    return (
        <div className={styles.dashboard}>
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
                        {refuelings.map(refueling => (
                            <tr key={refueling.id}>
                                <td>{refueling.name}</td>
                                <td>{refueling.refueling_date_time}</td>
                                <td>{refueling.fuel_quantity} л</td>
                                <td>
                                    <svg className={styles["nav-icon"]} width={22} height={26}>
                                        <use xlinkHref={sprite + "#check"}/>
                                    </svg>
                                </td>
                            </tr>
                        ))}
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
