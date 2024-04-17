import React, { useEffect, useState } from 'react';
import styles from '../../styles/modalfuelquantity.module.css';
import { isAuthenticated } from "../../utils/authUsers";
import axios from "axios";
import Axios from "axios";

const ModalFuelQuantity = ({ octaneNumberId, octaneNumber, pricePerLiter, gasStation, numberColumn, fuelColumnId, onClose }) => {
    const [fuelAmount, setFuelAmount] = useState(0);
    const [maxFuelAmount, setMaxFuelAmount] = useState(45);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cars, setCars] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        if (isAuthenticated()) {
            async function fetchCarsUsers() {
                try {
                    const userResponse = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    });
                    const userId = userResponse.data.user.id;
                    setUserId(userId)
                    const carsResponse = await Axios.get(`http://localhost:8000/cars/user/6`);
                    setCars(carsResponse.data);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            }

            fetchCarsUsers();
        }
    }, []);


    const handlePayment = async () => {
        try {
            if (!selectedCar) {
                console.error('Машина не выбрана');
                return;
            }

            if (!fuelColumnId || !octaneNumberId) {
                console.error('Не выбрана колонка или тип топлива');
                return;
            }

            const refuelingData = {
                user: userId,
                car: selectedCar.id,
                fuel_column: fuelColumnId,
                fuel_type:  octaneNumberId,
                fuel_quantity: fuelAmount,
                refueling_id: gasStation.id
            };

            await axios.post('http://localhost:8000/refuling/refuelings/', refuelingData);

            setFuelAmount(0);
            onClose();
        } catch (error) {
            console.error('Ошибка при оплате:', error);
        }
    };

    const handleChange = (e) => {
        let amount = parseInt(e.target.value);
        amount = Math.max(0, Math.min(maxFuelAmount, amount));
        setFuelAmount(amount);
    };

    const handleCarChange = (e) => {
        const selectedCarId = e.target.value;
        const selectedCar = cars.find(car => car.id === parseInt(selectedCarId));
        setSelectedCar(selectedCar);
        setMaxFuelAmount(selectedCar.fuel_tank_volume);
        setFuelAmount(0);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
                <h2>{octaneNumber}</h2>
                <p>Колонка {numberColumn}</p>
                <div className={styles["fuel-quantity"]}>
                    <div>
                        <select onChange={handleCarChange} className={styles['select-cars']}>
                            <option value="">Выберите машину</option>
                            {cars.map(car => (
                                <option key={car.id}
                                        value={car.id}>{car.model_name} {car.brand_name} - {car.registration_number}</option>
                            ))}
                        </select>
                        <input
                            type="range"
                            onChange={handleChange}
                            min="0" max={maxFuelAmount} step="0.5"
                            value={fuelAmount}
                        />
                        <p>Выбрано топлива: {fuelAmount} л</p>
                    </div>
                </div>
                <button className={styles["btn-pay"]} onClick={handlePayment}>Оплатить</button>
                <span>Выберите количество топлива</span>
            </div>
        </div>
    );
};

export default ModalFuelQuantity;
