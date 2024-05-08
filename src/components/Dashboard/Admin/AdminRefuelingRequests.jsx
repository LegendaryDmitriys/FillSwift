import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/purchaserequests.module.css';
import sprite from "../../../sprite.svg";
import {formatDate} from "../../../utils/formateDate";

function AdminRefuelingRequests() {
    const [refuelingRequests, setRefuelingRequests] = useState([]);
    const [confirmedRefuelingRequests, setConfirmedRefuelingRequests] = useState([]);
    const [rejectedRefuelingRequests, setRejectedRefuelingRequests] = useState([]);
    const [pendingRefuelingRequests, setPendingRefuelingRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/refuling/refueling_requests/');
                const sortedRequests = response.data.refueling_requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRefuelingRequests(sortedRequests);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const separateRequests = () => {
            const confirmed = [];
            const rejected = [];
            const pending = [];

            refuelingRequests.forEach(request => {
                switch (request.status) {
                    case 'confirmed':
                        confirmed.push(request);
                        break;
                    case 'rejected':
                        rejected.push(request);
                        break;
                    default:
                        pending.push(request);
                }
            });

            setConfirmedRefuelingRequests(confirmed);
            setRejectedRefuelingRequests(rejected);
            setPendingRefuelingRequests(pending);
        };

        separateRequests();
    }, [refuelingRequests]);

    const handleChangeRefuelingRequestStatus = async (requestId, newStatus) => {
        try {
            await axios.patch(`http://192.168.0.106:8000/refuling/change_refueling_request_status/${requestId}/`, { status: newStatus });

            setRefuelingRequests(prevRequests => prevRequests.map(request => {
                if (request.id === requestId) {
                    return { ...request, status: newStatus };
                }
                return request;
            }));

        } catch (error) {
            console.error('Ошибка при изменении статуса запроса на заправку:', error);
        }
    };

    const handleStatusClick = (requestId, newStatus) => {
        setRefuelingRequests(prevRequests =>
            prevRequests.map(request => {
                if (request.id === requestId) {
                    return { ...request, isDropdownOpen: !request.isDropdownOpen };
                }
                return request;
            })
        );
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cчета</h1>
            <div className={styles["allInvoices-stats"]}>
                <div className={styles["invoices-block"]}>
                    <svg width={49} height={49} className={styles['icon-invoice']}>
                        <use xlinkHref={sprite + "#invoice-total"}/>
                    </svg>
                    <article className={styles['invoice-info_text']}>
                        <h2>В общем</h2>
                        <p>{refuelingRequests.length > 0 ? parseFloat(refuelingRequests.reduce((total, request) => total + parseFloat(request.fuel_cost), 0)).toFixed(2) : '0.00'} р</p>
                        <span>за {refuelingRequests.length} заказов</span>
                    </article>
                </div>
                <div className={styles["invoices-block"]}>
                    <svg width={49} height={49} className={styles['icon-invoice']}>
                        <use xlinkHref={sprite + "#invoice-paid"}/>
                    </svg>
                    <article className={styles['invoice-info_text']}>
                        <h2>Принятые</h2>
                        <p>{confirmedRefuelingRequests.length > 0 ? confirmedRefuelingRequests.reduce((total, request) => total + parseFloat(request.fuel_cost), 0).toFixed(2) : '0.00'}</p>
                        <span>за {confirmedRefuelingRequests.length} заказов</span>
                    </article>
                </div>
                <div className={styles["invoices-block"]}>
                    <svg width={49} height={49} className={styles['icon-invoice']}>
                        <use xlinkHref={sprite + "#invoice-pending"}/>
                    </svg>
                    <article className={styles['invoice-info_text']}>
                        <h2>В ожидании</h2>
                        <p>{pendingRefuelingRequests.length > 0 ? pendingRefuelingRequests.reduce((total, request) => total + parseFloat(request.fuel_cost), 0).toFixed(2) : '0.00'} р</p>
                        <span>за {pendingRefuelingRequests.length} заказов</span>
                    </article>
                </div>
            </div>
            <h2 className={styles.subtitle}>Принятые ({confirmedRefuelingRequests.length})</h2>
            <div className={styles.gridContainer}>
                {confirmedRefuelingRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p>{request.fuel_cost}</p>
                        <p>{formatDate(request.refueling_date_time)}</p>
                        <div
                            className={styles.status}
                            onClick={() => handleStatusClick(request.id)}
                        >
                            <span
                            className={`${styles.statusText} ${request.status === 'confirmed' ? styles.statusConfirmed : (request.status === 'rejected' ? styles.statusRejected : styles.statusPending)}`}>{request.status}</span>
                            {request.isDropdownOpen && (
                                <div className={styles.statusDropdown} onClick={handleDropdownClick}>
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleChangeRefuelingRequestStatus(request.id, e.target.value)}
                                    >
                                        <option value="confirmed">Принят</option>
                                        <option value="rejected">Отклонен</option>
                                        <option value="pending">В ожидании</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className={styles.subtitle}>Отмененные ({rejectedRefuelingRequests.length})</h2>
            <div className={styles.gridContainer}>
                {rejectedRefuelingRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p>{request.fuel_cost}</p>
                        <p>{formatDate(request.refueling_date_time)}</p>
                        <div
                            className={styles.status}
                            onClick={() => handleStatusClick(request.id)}
                        >
                            <span
                                className={`${styles.statusText} ${request.status === 'confirmed' ? styles.statusConfirmed : (request.status === 'rejected' ? styles.statusRejected : styles.statusPending)}`}>{request.status}</span>
                            {request.isDropdownOpen && (
                                <div className={styles.statusDropdown} onClick={handleDropdownClick}>
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleChangeRefuelingRequestStatus(request.id, e.target.value)}
                                    >
                                        <option value="confirmed">Принят</option>
                                        <option value="rejected">Отклонен</option>
                                        <option value="pending">В ожидании</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className={styles.subtitle}>В ожидании ({pendingRefuelingRequests.length})</h2>
            <div className={styles.gridContainer}>
                {pendingRefuelingRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p>{request.fuel_cost}</p>
                        <p>{formatDate(request.refueling_date_time)}</p>
                        <div
                            className={styles.status}
                            onClick={() => handleStatusClick(request.id)}
                        >
                            <span
                                className={`${styles.statusText} ${request.status === 'confirmed' ? styles.statusConfirmed : (request.status === 'rejected' ? styles.statusRejected : styles.statusPending)}`}>{request.status}</span>
                            {request.isDropdownOpen && (
                                <div className={styles.statusDropdown} onClick={handleDropdownClick}>
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleChangeRefuelingRequestStatus(request.id, e.target.value)}
                                    >
                                        <option value="confirmed">Принят</option>
                                        <option value="rejected">Отклонен</option>
                                        <option value="pending">В ожидании</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminRefuelingRequests;
