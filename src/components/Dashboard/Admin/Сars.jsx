import React, { useEffect, useState } from 'react';
import HeaderBoard from "../HeaderBoard";
import styles from "../../../styles/dashboardcustomers.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import axios from "axios";

function Cars(props) {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/cars/users/');
                setCars(response.data);
            } catch (error) {
                console.error('Ошибка загрузки автомобилей:', error);
            }
        };

        fetchCars();
    }, []);

    console.log(cars);

    return (
        <div>
            <HeaderBoard title={"Автомобили"} description={"Здесь отображаются все автомобили зарегистрированные в системе"} />
            <div className={styles.customers}>
                <ul>
                    {cars.map(car => (
                        <Link key={car.id} to={`${ROUTES.CarsDetails}/${car.id}`}>
                            <li className={styles['customer-item']}>
                                <p>Регистрационный номер: {car.registration_number}</p>
                                <p>Марка: {car.brand_name}</p>
                                <p>Модель: {car.model_name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cars;
