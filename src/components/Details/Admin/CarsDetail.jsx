import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../../../utils/routes";
import styles from "../../../styles/dashboardcustomers.module.css";

function CarsDetail(props) {
    const { carId } = useParams();
    const token = localStorage.getItem('token');
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carResponse  = await axios.get(`http://192.168.0.106:8000/cars/user/${carId}`, {
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


    console.log(car)

    return (
        <div>
            {car !== null ? (
                <ul>
                    {car.map(car => (
                        <li key={car.id} className={styles['customer-item']}>
                            <p>Регистрационный номер: {car.registration_number}</p>
                            <p>Марка: {car.brand_name}</p>
                            <p>Модель: {car.model_name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CarsDetail;
