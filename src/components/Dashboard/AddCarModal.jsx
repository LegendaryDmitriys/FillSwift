import React, { useState, useEffect } from 'react';
import styles from '../../styles/addcarmodal.module.css';
import axios from "axios";
import { toast } from 'react-toastify';
import {API} from "../../utils/APi";
function AddCarModal({ handleCloseModal, userId, selectedBrand, setSelectedBrand, selectedModel, setSelectedModel,updateCars }) {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [fuelTankVolume, setFuelTankVolume] = useState('');
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${API}/cars/models/`)
            .then(response => {
                const data = response.data;
                const brandMap = {};
                data.forEach(model => {
                    if (!brandMap[model.brand_id]) {
                        brandMap[model.brand_id] = model.brand_name;
                    }
                });
                setModels(data);
                setBrands(Object.entries(brandMap).map(([id, name]) => ({ id, name })));
            })
            .catch(error => {
                console.error('Ошибка при загрузке моделей автомобилей:', error);
                toast.error('Ошибка при загрузке моделей автомобилей:', error)
            });
    }, []);

    const handleAddCar = () => {
        const data = {
            user: userId,
            brand: selectedBrand,
            model: selectedModel,
            registration_number: registrationNumber,
            fuel_tank_volume: fuelTankVolume
        };

        fetch(`${API}/cars/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setError(data.errors);
                } else {
                    toast.success('Машина успешно добавлена')
                    updateCars(cars => [...cars, data]);
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
                toast.error('Ошибка при отправке запроса:', error)
            });
    };


    const handleRegistrationNumberChange = (e) => {
        let value = e.target.value.toUpperCase();
        const regex = /^[A-Za-z]{0,1}\d{0,3}[A-Za-z]{0,2}$/;
        if (regex.test(value)) {
            setRegistrationNumber(value);
        }
    };

    const handleFuelTankVolumeChange = (e) => {
        const value = Math.min(e.target.value, 125);
        setFuelTankVolume(value);
    };


    return (
        <div className={styles.modalCars}>
            <div className={styles.modalContentCars}>
                <h2>Выберите марку и модель</h2>
                <form action="">
                    <select value={selectedBrand} className={styles.select} onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value="">Выберите марку</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                    <select value={selectedModel} className={styles.select} onChange={(e) => setSelectedModel(e.target.value)}>
                        <option value="">Выберите модель</option>
                        {selectedBrand && models.filter(model => model.brand_id === parseInt(selectedBrand)).map((model) => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                    <article className={styles.registrationNumber}>
                        <label htmlFor="registrationNumber">Номер автомобиля:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={handleRegistrationNumberChange}
                            placeholder="Введите номер автомобиля, по примеру - A999AA"
                            required
                        />

                    </article>
                    <article className={styles.fuelTankVolume}>
                        <label htmlFor="fuelTankVolume">Объем бака (в литрах):</label>
                        <input type="number" id="fuelTankVolume" value={fuelTankVolume}
                               onChange={handleFuelTankVolumeChange} min="45" max="150"
                               placeholder="Введите объем бака"
                               required
                        />
                    </article>
                    {error && error.errors && error.errors.registration_number && error.errors.registration_number[0] && (
                        <p className={styles.error}>{error.errors.registration_number[0]}</p>
                    )}
                </form>
                <div className={styles.controlCar}>
                    <button className={styles.addCars} onClick={handleAddCar}>Добавить</button>
                    <button className={styles.closeModal} onClick={handleCloseModal}>Закрыть</button>
                </div>
            </div>
        </div>
    );
}

export default AddCarModal;
