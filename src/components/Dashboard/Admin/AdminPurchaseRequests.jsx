import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/purchaserequests.module.css';

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

    console.log(purchaseRequests)


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

    return (
        <div>
            <h2>Принятые запросы на покупку</h2>
            <ul>
                {confirmedPurchaseRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p>{request.id}</p>
                        <p>{request.purchase_date}</p>
                        <p>{request.status}</p>
                        <p>{request.total_price}</p>

                    </li>
                ))}
            </ul>

            <h2>Отклонённые запросы на покупку</h2>
            <ul>
                {rejectedPurchaseRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p>{request.id}</p>
                        <p>{request.purchase_date}</p>
                        <p>{request.status}</p>
                        <p>{request.total_price}</p>
                    </li>
                ))}
            </ul>

            <h2>Запросы на покупку в ожидании</h2>
            <ul>
                {pendingPurchaseRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p>{request.user.firstname} {request.user.lastname}</p>
                        <p>{request.user.email}</p>
                        <p>{request.purchase_date}</p>
                        <p>{request.status}</p>
                        <p>{request.total_price}</p>
                        <p>Продукты:</p>
                        <ul>
                            {request.products.map(product => (
                                <li key={product.id}>
                                    <p>Наименование продукта:</p>
                                    <p>{product.name}</p>
                                    <p>Описание:</p>
                                    <p>{product.description}</p>
                                    <p>Производитель:</p>
                                    <p>{product.manufacturer}</p>
                                    <p>Цена за единицу:</p>
                                    <p>{product.price_per_unit}</p>
                                    <p>Количество:</p>
                                    <p>{product.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <button className={styles.statusButton}
                                onClick={() => handleChangePurchaseRequestStatus(request.id, 'rejected')}>Отклонить
                        </button>
                        <button className={styles.statusButton}
                                onClick={() => handleChangePurchaseRequestStatus(request.id, 'confirmed')}>Принять
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPurchaseRequests;
