import React, { useEffect, useState } from 'react';
import styles from '../../styles/modalfuelquantity.module.css';
import { isAuthenticated } from "../../utils/authUsers";
import axios from "axios";
import Axios from "axios";
import {toast} from "react-toastify";

const ModalFuelQuantity = ({ octaneNumberId, octaneNumber, pricePerLiter, gasStation, numberColumn, fuelColumnId, onClose }) => {
    const [fuelAmount, setFuelAmount] = useState(0);
    const [maxFuelAmount, setMaxFuelAmount] = useState(45);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cars, setCars] = useState([]);
    const [userId, setUserId] = useState([]);

    const authenticated = isAuthenticated();
    useEffect(() => {
        if (authenticated) {
            async function fetchCarsUsers() {
                try {
                    const userResponse = await axios.get('http://192.168.0.106:8000/api/user', {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    });
                    const userId = userResponse.data.user.id;
                    setUserId(userId)
                    const carsResponse = await Axios.get(`http://192.168.0.106:8000/cars/user/${userId}`);
                    setCars(carsResponse.data);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            }

            fetchCarsUsers();
        }
    }, []);

    const totalPrice = fuelAmount * pricePerLiter;

    const handlePayment = async () => {
        try {
            if (fuelAmount <= 0) {
                toast.error('Выберите количество топлива');
                return;
            }

            if (!selectedCar) {
                toast.error('Машина не выбрана');
                return;
            }

            if (!fuelColumnId || !octaneNumberId) {
                toast.error('Не выбрана колонка или тип топлива')
                return;
            }

            const refuelingData = {
                user: userId,
                car: selectedCar.id,
                fuel_column: fuelColumnId,
                fuel_type: octaneNumberId,
                fuel_quantity: fuelAmount,
                refueling_id: gasStation.id,
                fuel_cost: totalPrice
            };

            await axios.post('http://192.168.0.106:8000/refuling/refuelings/', refuelingData);

            setFuelAmount(0);
            onClose();
            toast.success('Оплата прошла успешно')
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
        setMaxFuelAmount(selectedCar ? selectedCar.fuel_tank_volume : 0);
        setFuelAmount(0);
    };

    const isPaymentDisabled = !authenticated || !selectedCar;


    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
                <h2>{octaneNumber}</h2>
                <p>Колонка {numberColumn}</p>
                <div className={styles["fuel-quantity"]}>
                    <div>
                        <input
                            type="range"
                            onChange={handleChange}
                            min="0" max={maxFuelAmount} step="0.5"
                            value={fuelAmount}
                        />
                    </div>
                </div>
                <div className={styles["filled-fuels"]}>
                    {authenticated ? (
                        cars.length > 0 ? (
                            <select onChange={handleCarChange} className={styles['select-cars']}>
                                <option value="">Выберите машину</option>
                                {cars.map(car => (
                                    <option key={car.id}
                                            value={car.id}>{car.model_name} {car.brand_name} - {car.registration_number}</option>
                                ))}
                            </select>
                        ) : (
                            <p>У вас нет зарегистрированных автомобилей.</p>
                        )
                    ) : (
                        <p>Для заправки вам необходимо авторизоваться.</p>
                    )}
                    <article>
                        <p>Выбрано топлива: {fuelAmount} л</p>
                        <p>Общая стоимость: {fuelAmount * pricePerLiter} ₽</p>
                    </article>
                </div>
                <button className={styles["btn-pay"]} onClick={handlePayment} disabled={isPaymentDisabled}>Оплатить
                </button>
                <span>Выберите количество топлива</span>
            </div>
        </div>
    );
};

export default ModalFuelQuantity;
