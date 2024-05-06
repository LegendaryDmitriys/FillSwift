import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderBoard from "../HeaderBoard";
import styles from "../../../styles/dashboardcustomers.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

function AdminFuelStation(props) {
    const [fuelStations, setFuelStations] = useState([]);
    const [addingFuelStation, setAddingFuelStation] = useState(false);
    const [newFuelStation, setNewFuelStation] = useState({
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        fuel_quantity: ''
    });

    useEffect(() => {
        const fetchFuelStations = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/fuelstation/list/');
                setFuelStations(response.data);
            } catch (error) {
                console.error('Ошибка загрузки заправочных станций:', error);
            }
        };

        fetchFuelStations();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFuelStation({
            ...newFuelStation,
            [name]: value
        });
    };

    const addFuelStation = async () => {
        try {
            const response = await axios.post('http://192.168.0.106:8000/fuelstation/list/', newFuelStation);
            setFuelStations([...fuelStations, response.data]);
            setAddingFuelStation(false);
            setNewFuelStation({
                name: '',
                location: '',
                latitude: '',
                longitude: '',
                fuel_quantity: ''
            });
            console.log('Заправочная станция успешно добавлена:', response.data);
        } catch (error) {
            console.error('Ошибка при добавлении заправочной станции:', error);
        }
    };

    return (
        <div>
            <HeaderBoard title={"Заправочные станции"} description={"Здесь отображаются все заправочные станции"}/>
            <div className={styles.customers}>
                <button onClick={() => setAddingFuelStation(true)}>Добавить</button>
                {addingFuelStation && (
                    <div>
                        <h3>Добавить новую заправочную станцию</h3>
                        <label>
                            Название:
                            <input
                                type="text"
                                name="name"
                                value={newFuelStation.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Местоположение:
                            <input
                                type="text"
                                name="location"
                                value={newFuelStation.location}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Широта:
                            <input
                                type="text"
                                name="latitude"
                                value={newFuelStation.latitude}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Долгота:
                            <input
                                type="text"
                                name="longitude"
                                value={newFuelStation.longitude}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Количество топлива:
                            <input
                                type="text"
                                name="fuel_quantity"
                                value={newFuelStation.fuel_quantity}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={addFuelStation}>Добавить</button>
                    </div>
                )}
                <ul>
                    {fuelStations.map(fuelStation => (
                        <Link to={`${ROUTES.AdminFuelStationDetail}/${fuelStation.id}`} key={fuelStation.id}>
                            <li className={styles['customer-item']}>
                                {fuelStation.name} - {fuelStation.location} {fuelStation.fuel_quantity}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminFuelStation;
