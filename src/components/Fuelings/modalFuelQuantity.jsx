import React, { useState } from 'react';
import styles from '../../styles/modalfuelquantity.module.css';

const ModalFuelQuantity = ({ octaneNumber, pricePerLiter, numberColumn, onClose }) => {
    const [fuelAmount, setFuelAmount] = useState(0);

    const handleChange = (e) => {
        const maxFuel = 1000; // Максимальное количество топлива
        const minFuel = 0; // Минимальное количество топлива
        let amount = parseInt(e.target.value); // Получаем значение из инпута


        amount = Math.max(minFuel, Math.min(maxFuel, amount));

        setFuelAmount(amount);
    };

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
                            min="0" max="1000" step="12.5"
                        />
                        <p>Выбрано топлива: {fuelAmount} л</p>
                    </div>
                </div>
                <button className={styles["btn-pay"]}>Оплатить</button>
                <span>Выберите количество топлива</span>
            </div>
        </div>
    );
};

export default ModalFuelQuantity;
