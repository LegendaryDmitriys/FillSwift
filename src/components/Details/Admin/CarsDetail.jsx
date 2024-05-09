import React from 'react';
import {useParams} from "react-router-dom";

import {useEffect, useState} from "react";

import EditCarForm from "../../Dashboard/Admin/EditCarForm.jsx";
import styles from "../../../styles/admincarsdetail.module.css";
import sprite from "../../../sprite.svg";
import axios from "axios";

function CarsDetail(props) {
    const { carId } = useParams();
    const token = localStorage.getItem('token');
    const [car, setCar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carResponse = await axios.get(`http://192.168.0.106:8000/cars/cars/${carId}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setCar(carResponse.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [carId, token]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`http://192.168.0.106:8000/cars/cars/${carId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setCar(null);
        } catch (error) {
            console.error('Ошибка при удалении автомобиля:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <EditCarForm car={car} toggleEdit={toggleEdit} userId={car ? car.user : null} />
            ) : (
                <>
                    <div className={styles.carDetail}>
                        <button onClick={toggleEdit} className={styles['edit-cars']}>
                            Редактировать
                            <svg className='logo' width={24} height={24}>
                                <use xlinkHref={sprite + "#pencil-icon"}/>
                            </svg>
                        </button>
                        {car === null ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <h2>Основные детали автомобиля:</h2>
                                <div className={styles["cars-detail_text"]}>
                                    <p>Бренд автомобиля: {car.brand_name}</p>
                                    <p>Модель автомобиля: {car.model_name}</p>
                                    <p>Топливный бак: {car.fuel_tank_volume}</p>
                                    <p>Регистрационный номер: {car.registration_number}</p>
                                </div>

                            </>
                        )}
                        <button onClick={handleDeleteAccount} className={styles["delete-car"]}>Удалить</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CarsDetail;
