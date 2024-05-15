import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from "../../styles/dashboard.module.css";
import sprite from "../../sprite.svg";

import HeaderBoard from "./HeaderBoard.jsx";
import MinSideBar from "./MinSideBar.jsx";
import {isAuthenticated} from "../../utils/authUsers.js";
import {formatDate} from "../../utils/formateDate.js";
import {API} from "../../utils/APi";

function DashboardHistoryFuels(props) {
    const [refuelings, setRefuelings] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuthenticated()) {
            async function fetchData() {
                try {
                    const userResponse = await axios.get(`${API}/api/user`, {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setUserData(userResponse.data);

                    const refuelingsResponse = await axios.get(`${API}/refuling/${userResponse.data.user.id}/refuelings/`);
                    setRefuelings(refuelingsResponse.data);
                    setRefuelings(refuelingsResponse.data.map(refueling => ({
                        ...refueling,
                        refueling_date_time: formatDate(refueling.refueling_date_time)
                    })));
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            }

            fetchData();
        }
    }, []);

    const downloadReceipt = async (refuelingId) => {
        try {
            const response = await axios.get(`${API}/refuling/download/receipt/${refuelingId}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt_${refuelingId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Ошибка при скачивании чека:', error);
        }
    };

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
                                <td className={styles["item-table"]}>Заправка #{refueling.id}</td>
                                <td className={styles["item-table"]}>{refueling.refueling_date_time}</td>
                                <td className={styles["item-table"]}>{refueling.fuel_quantity} л</td>
                                <td className={styles["item-table"]}>
                                    <svg className={styles["download-check"]} width={22} height={26} onClick={() => downloadReceipt(refueling.id)}>
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
