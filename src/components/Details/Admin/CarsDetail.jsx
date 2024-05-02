import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../../../utils/routes";
import styles from "../../../styles/dashboardcustomers.module.css";
import EditCarForm from "../../Dashboard/Admin/EditCarForm";

function CarsDetail(props) {
    const { carId } = useParams();
    const token = localStorage.getItem('token');
    const [car, setCar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carResponse  = await axios.get(`http://192.168.0.106:8000/cars/cars/${carId}`, {
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
                    <button onClick={toggleEdit}>Редактировать</button>
                    {car === null ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            <li>Бренд автомобиля: {car.brand_name}</li>
                            <li>Модель автомобиля: {car.model_name}</li>
                            <li>Топливный бак: {car.fuel_tank_volume}</li>
                            <li>Регистрационный номер: {car.registration_number}</li>
                        </ul>
                    )}
                    <button onClick={handleDeleteAccount}>Удалить</button>
                </>
            )}
        </div>
    );
}

export default CarsDetail;
