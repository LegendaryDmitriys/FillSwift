import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/purchaserequests.module.css';
import sprite from "../../../sprite.svg";
import { formatDate } from "../../../utils/formateDate.js";

function AdminPurchaseRequests() {
    const [purchaseRequests, setPurchaseRequests] = useState([]);
    const [confirmedPurchaseRequests, setConfirmedPurchaseRequests] = useState([]);
    const [rejectedPurchaseRequests, setRejectedPurchaseRequests] = useState([]);
    const [pendingPurchaseRequests, setPendingPurchaseRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/carts/purchases-list/');
                setPurchaseRequests(response.data.purchases);
            } catch (error) {
                console.error('Ошибка при получении данных о запросах на покупку:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const separateRequests = () => {
            const confirmed = [];
            const rejected = [];
            const pending = [];

            purchaseRequests.forEach(request => {
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

            setConfirmedPurchaseRequests(confirmed);
            setRejectedPurchaseRequests(rejected);
            setPendingPurchaseRequests(pending);
        };

        separateRequests();
    }, [purchaseRequests]);

    const handleChangePurchaseRequestStatus = async (requestId, newStatus) => {
        try {
            await axios.patch(`http://192.168.0.106:8000/carts/purchase/${requestId}/change_status/`, { status: newStatus });

            setPurchaseRequests(prevRequests => prevRequests.map(request => {
                if (request.id === requestId) {
                    return { ...request, status: newStatus };
                }
                return request;
            }));
        } catch (error) {
            console.error('Ошибка при изменении статуса запроса на покупку:', error);
        }
    };

    const handleStatusClick = (requestId, newStatus) => {
        setPurchaseRequests(prevRequests =>
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
                        <p>{purchaseRequests.length > 0 ? purchaseRequests.reduce((total, request) => total + parseFloat(request.total_price), 0).toFixed(2) : '0.00'} р</p>
                        <span>за {purchaseRequests.length} заказов</span>
                    </article>
                </div>
                <div className={styles["invoices-block"]}>
                    <svg width={49} height={49} className={styles['icon-invoice']}>
                        <use xlinkHref={sprite + "#invoice-paid"}/>
                    </svg>
                    <article className={styles['invoice-info_text']}>
                        <h2>Принятые</h2>
                        <p>{confirmedPurchaseRequests.length > 0 ? confirmedPurchaseRequests.reduce((total, request) => total + parseFloat(request.total_price), 0).toFixed(2) : '0.00'}</p>
                        <span>за {confirmedPurchaseRequests.length} заказов</span>
                    </article>
                </div>
                <div className={styles["invoices-block"]}>
                    <svg width={49} height={49} className={styles['icon-invoice']}>
                        <use xlinkHref={sprite + "#invoice-pending"}/>
                    </svg>
                    <article className={styles['invoice-info_text']}>
                        <h2>В ожидании</h2>
                        <p>{pendingPurchaseRequests.length > 0 ? pendingPurchaseRequests.reduce((total, request) => total + parseFloat(request.total_price), 0).toFixed(2) : '0.00'} р</p>
                        <span>за {pendingPurchaseRequests.length} заказов</span>
                    </article>
                </div>
            </div>

            <h2 className={styles.subtitle}>Принятые ({confirmedPurchaseRequests.length})</h2>
            <div className={styles.gridContainer}>
                {confirmedPurchaseRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user.firstname} {request.user.lastname}</p>
                        <p>{request.user.email}</p>
                        <p>{formatDate(request.purchase_date)}</p>
                        <p>{request.total_price}</p>
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
                                        onChange={(e) => handleChangePurchaseRequestStatus(request.id, e.target.value)}
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

            <h2 className={styles.subtitle}>Отмененные ({rejectedPurchaseRequests.length})</h2>
            <div className={styles.gridContainer}>
                {rejectedPurchaseRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user.firstname} {request.user.lastname}</p>
                        <p>{request.user.email}</p>
                        <p>{formatDate(request.purchase_date)}</p>
                        <p>{request.total_price}</p>
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
                                        onChange={(e) => handleChangePurchaseRequestStatus(request.id, e.target.value)}
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

            <h2 className={styles.subtitle}>В ожидании ({pendingPurchaseRequests.length})</h2>
            <div className={styles.gridContainer}>
                {pendingPurchaseRequests.map(request => (
                    <div key={request.id} className={styles.gridItem}>
                        <p>{request.user.firstname} {request.user.lastname}</p>
                        <p>{request.user.email}</p>
                        <p>{formatDate(request.purchase_date)}</p>
                        <p>{request.total_price}</p>
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
                                        onChange={(e) => handleChangePurchaseRequestStatus(request.id, e.target.value)}
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

export default AdminPurchaseRequests;
