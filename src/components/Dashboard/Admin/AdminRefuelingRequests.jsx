import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/refuelingrequests.module.css'

function AdminRefuelingRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/refuling/refueling_requests/');
                setRequests(response.data.refueling_requests);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);


    console.log(requests)

    const handleChangeStatus = async (requestId, newStatus) => {
        try {
            await axios.patch(`http://192.168.0.106:8000/refuling/change_refueling_request_status/${requestId}/`, { status: newStatus });
            setRequests(prevRequests => prevRequests.map(request => {
                if (request.id === requestId) {
                    return { ...request, status: newStatus };
                }
                return request;
            }));
        } catch (error) {
            console.error('Ошибка при изменении статуса запроса:', error);
        }
    };



    return (
        <div>
            <h1>Запросы на заправку</h1>
            <ul>
                {requests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p className={styles.requestDetails}>Пользователь: {request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p className={styles.requestDetails}>Автомобиль: {request.car__brand__name} {request.car__model__name} {request.car__registration_number}</p>
                        <p className={styles.requestDetails}>Колонка: {request.fuel_column__number}</p>
                        <p className={styles.requestDetails}>Тип топлива: {request.fuel_type__name}  {request.fuel_column__fuel_type__octane_number}</p>
                        <p className={styles.requestDetails}>Количество топлива: {request.fuel_quantity}</p>
                        <p className={styles.requestDetails}>Стоимость: {request.fuel_cost}</p>
                        <p className={styles.requestDetails}>Статус: {request.status}</p>
                        <button className={styles.statusButton} onClick={() => handleChangeStatus(request.id, 'confirmed')}>Одобрить</button>
                        <button className={styles.statusButton} onClick={() => handleChangeStatus(request.id, 'rejected')}>Отклонить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default AdminRefuelingRequests;
