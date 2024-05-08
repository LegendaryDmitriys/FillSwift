import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

import styles from '../../../styles/editcarform.module.css'

function EditCarForm({ car, toggleEdit, userId, }) {
    const [selectedBrand, setSelectedBrand] = useState(car.brand);
    const [selectedModel, setSelectedModel] = useState(car.model);
    const [registrationNumber, setRegistrationNumber] = useState(car.registration_number);
    const [fuelTankVolume, setFuelTankVolume] = useState(car.fuel_tank_volume);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(car.user);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://192.168.0.106:8000/cars/models/')
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

        axios.get('http://192.168.0.106:8000/api/user-list')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке списка пользователей:', error);
                toast.error('Ошибка при загрузке списка пользователей:', error)
            });
    }, []);



    const handleEditCar = () => {
        const data = {
            user: selectedUser,
            brand: selectedBrand,
            model: selectedModel,
            registration_number: registrationNumber,
            fuel_tank_volume: fuelTankVolume
        };

        axios.put(`http://192.168.0.106:8000/cars/cars/${car.id}/`, data)
            .then(response => {
                toast.success('Данные об автомобиле успешно обновлены');
                toggleEdit();
            })
            .catch(error => {
                console.error('Ошибка при редактировании данных об автомобиле:', error);
                setError('Ошибка при редактировании данных об автомобиле');
            });
    };


    const handleCancel = () => {
        setSelectedBrand(car.brand);
        setSelectedModel(car.model);
        setRegistrationNumber(car.registration_number);
        setFuelTankVolume(car.fuel_tank_volume);
        setSelectedUser(car.user);
        setError('');
        toggleEdit();
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
        <div className={styles.container}>
            <h2 className={styles.title}>Редактирование данныех об автомобиле</h2>
            <form className={styles['edit-car_form']}>
                <label htmlFor="user">Выберите пользователя:</label>
                <select
                    id="user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                >
                    <option value="">Выберите пользователя</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.firstname} {user.lastname} {user.email}</option>
                    ))}
                </select>
                <label htmlFor="brand">Выберите бренд:</label>
                <select
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setSelectedModel('');
                    }}
                    required
                >
                    <option value="">Выберите бренд</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>

                <label htmlFor="model">Выберите модель:</label>
                <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    required
                >
                    <option value="">Выберите модель</option>
                    {selectedBrand && models.filter(model => model.brand_id === parseInt(selectedBrand)).map((model) => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>

                <label htmlFor="registrationNumber">Номер автомобиля:</label>
                <input
                    type="text"
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="Введите номер автомобиля"
                    required
                />

                <label htmlFor="fuelTankVolume">Объем бака (в литрах):</label>
                <input
                    type="number"
                    id="fuelTankVolume"
                    value={fuelTankVolume}
                    onChange={(e) => setFuelTankVolume(e.target.value)}
                    min="45"
                    step="1"
                    placeholder="Введите объем бака"
                    required
                />

                {error && <p>{error}</p>}

                <button type="button" onClick={handleEditCar} className={styles['btn-save']}>Сохранить изменения</button>
                <button type="button" onClick={handleCancel} className={styles['btn-cancel']}>Отменить</button>
            </form>
        </div>
    );
}

export default EditCarForm;
