import React, {useEffect, useState} from 'react';
import axios from "axios";
import HeaderBoard from "../HeaderBoard";
import styles from "../../../styles/dashboardcustomers.module.css";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../utils/routes";

function AdminFuelType(props) {
    const [fuelTypes, setFuelTypes]  = useState([]);
    const [newFuelType, setNewFuelType] = useState({
        name: '',
        octane_number: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/fuelstation/fueltypes/');
                setFuelTypes(response.data);
            } catch (error) {
                console.error('Ошибка загрузки типов топлива:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFuelType({
            ...newFuelType,
            [name]: value
        });
    };

    const addFuelType = async () => {
        try {
            const response = await axios.post(
                'http://192.168.0.106:8000/fuelstation/fueltypes/',
                newFuelType
            );
            console.log('Тип топлива успешно добавлен:', response.data);
            setFuelTypes([...fuelTypes, response.data]);
            setNewFuelType({
                name: '',
                octane_number: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Ошибка при добавлении типа топлива:', error);
        }
    };


    const deleteFuelType = async (fuelTypeId) => {
        try {
            await axios.delete(`http://192.168.0.106:8000/fuelstation/fueltypes/${fuelTypeId}/`);
            console.log('Тип топлива успешно удален');
            setFuelTypes(fuelTypes.filter(fuelType => fuelType.id !== fuelTypeId));
        } catch (error) {
            console.error('Ошибка при удалении типа топлива:', error);
        }
    };

    return (
        <div>
            <HeaderBoard title={"Типы топлива"}
                         description={"Здесь отображаются все типы топлива зарегистрированные в системе"} />
            <div className={styles.customers}>
                <ul>
                    {fuelTypes.map(fuelType => (
                        <li key={fuelType.id}
                            className={styles['customer-item']}>
                            {fuelType.id} - {fuelType.name} {fuelType.octane_number}
                            <button onClick={() => deleteFuelType(fuelType.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
            {showForm ? (
                <div>
                    <h2>Добавить тип топлива</h2>
                    <label>
                        Название:
                        <input
                            type="text"
                            name="name"
                            value={newFuelType.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Октановое число:
                        <input
                            type="text"
                            name="octane_number"
                            value={newFuelType.octane_number}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={addFuelType}>Добавить</button>
                    <button onClick={() => setShowForm(false)}>Отмена</button>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)}>Добавить</button>
            )}
        </div>
    );
}

export default AdminFuelType;