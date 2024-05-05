import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/refuelingrequests.module.css';
import AdminPurchaseRequests from "./AdminPurchaseRequests";

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


    return (
        <div>
            <h1>Запросы на заправку</h1>

            <h2>Принятые запросы</h2>
            <ul>
                {confirmedRefuelingRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p className={styles.requestDetails}>Пользователь: {request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p className={styles.requestDetails}>Автомобиль: {request.car__brand__name} {request.car__model__name} {request.car__registration_number}</p>
                        <p className={styles.requestDetails}>Колонка: {request.fuel_column__number}</p>
                        <p className={styles.requestDetails}>Тип топлива: {request.fuel_type__name} {request.fuel_column__fuel_type__octane_number}</p>
                        <p className={styles.requestDetails}>Количество топлива: {request.fuel_quantity}</p>
                        <p className={styles.requestDetails}>Стоимость: {request.fuel_cost}</p>
                        <p className={styles.requestDetails}>Статус: {request.status}</p>
                        <button className={styles.statusButton} onClick={() => handleChangeRefuelingRequestStatus(request.id, 'rejected')}>Отклонить</button>
                        <button className={styles.statusButton} onClick={() => handleChangeRefuelingRequestStatus(request.id, 'confirmed')}>Принять</button>
                    </li>
                ))}
            </ul>

            <h2>Отклонённые запросы</h2>
            <ul>
                {rejectedRefuelingRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p className={styles.requestDetails}>Пользователь: {request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p className={styles.requestDetails}>Автомобиль: {request.car__brand__name} {request.car__model__name} {request.car__registration_number}</p>
                        <p className={styles.requestDetails}>Колонка: {request.fuel_column__number}</p>
                        <p className={styles.requestDetails}>Тип топлива: {request.fuel_type__name} {request.fuel_column__fuel_type__octane_number}</p>
                        <p className={styles.requestDetails}>Количество топлива: {request.fuel_quantity}</p>
                        <p className={styles.requestDetails}>Стоимость: {request.fuel_cost}</p>
                        <p className={styles.requestDetails}>Статус: {request.status}</p>
                    </li>
                ))}
            </ul>

            <h2>Запросы в ожидании</h2>
            <ul>
                {pendingRefuelingRequests.map(request => (
                    <li key={request.id} className={styles.requestItem}>
                        <p className={styles.requestDetails}>Пользователь: {request.user__email} {request.user__lastname} {request.user__firstname}</p>
                        <p className={styles.requestDetails}>Автомобиль: {request.car__brand__name} {request.car__model__name} {request.car__registration_number}</p>
                        <p className={styles.requestDetails}>Колонка: {request.fuel_column__number}</p>
                        <p className={styles.requestDetails}>Тип топлива: {request.fuel_type__name} {request.fuel_column__fuel_type__octane_number}</p>
                        <p className={styles.requestDetails}>Количество топлива: {request.fuel_quantity}</p>
                        <p className={styles.requestDetails}>Стоимость: {request.fuel_cost}</p>
                        <p className={styles.requestDetails}>Статус: {request.status}</p>
                        <button className={styles.statusButton} onClick={() => handleChangeRefuelingRequestStatus(request.id, 'rejected')}>Отклонить</button>
                        <button className={styles.statusButton} onClick={() => handleChangeRefuelingRequestStatus(request.id, 'confirmed')}>Принять</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminRefuelingRequests;
