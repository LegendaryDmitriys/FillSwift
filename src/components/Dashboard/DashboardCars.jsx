import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";
import Cars from "../../utils/cars.json"

import styles from "../../styles/dashboardcars.module.css";
import sprite from "../../sprite.svg";
import {isAuthenticated} from "../../utils/authUsers";
import axios from "axios";
import AddCarModal from "./AddCarModal";
import {toast} from "react-toastify";

function DashboardCars(props) {
    const [cars, setCars] = useState([]);
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddCar = () => {
        setCars([...cars, { brand: selectedBrand, model: selectedModel }]);
        setSelectedBrand('');
        setSelectedModel('');
        setRegistrationNumber('');
        setShowModal(false);
    };

    useEffect(() => {
        if (isAuthenticated()) {
            async function fetchData() {
                try {
                    const userResponse = await axios.get('http://192.168.0.106:8000/api/user', {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setUserData(userResponse.data);

                    const carsResponse = await Axios.get(`http://192.168.0.106:8000/cars/user/${userResponse.data.user.id}`);
                    setCars(carsResponse.data);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            }

            fetchData();
        }
    }, []);

    const userId = userData && userData.user ? userData.user.id : null;


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCars = cars.filter(car => {
        return car.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.registration_number.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDeleteCar = async (carId) => {
        try {
            await axios.delete(`http://192.168.0.106:8000/cars/user/${userData.user.id}/${carId}/`);

            setCars(cars.filter(car => car.id !== carId));
            toast.success("Машина успешно удалена!")
        } catch (error) {
            console.error('Ошибка при удалении машины:', error);
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"Мое авто"} description={"Здесь отображаются все ваши автомобили "}/>
                <div className={styles["cars"]}>
                    <div className={styles["interaction-buttons"]}>
                        <form action="">
                            <div className={styles["form-input"]}>
                                <svg width={24} height={24}>
                                    <use xlinkHref={sprite + "#glass"}/>
                                </svg>
                                <input type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearchChange}/>
                            </div>
                        </form>
                        <button onClick={handleOpenModal}>Добавить авто</button>
                    </div>
                    <div className={styles["cars-cards"]}>
                        {filteredCars.map(car => (
                            <div key={car.id} className={styles["cars-card"]}>
                                <img src="../images/car.png" alt="Car"/>
                                <h2>{car.brand_name}</h2>
                                <h3>{car.model_name}</h3>
                                <p>Номер автомобиля</p>
                                <span>{car.registration_number}</span>
                                <h4>Объем бака</h4>
                                <span className={styles.fuels}>{car.fuel_tank_volume} Л</span>
                                <button onClick={() => handleDeleteCar(car.id)}>удалить</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <AddCarModal
                    handleCloseModal={handleCloseModal}
                    handleAddCar={handleAddCar}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    userId={userId}
                    updateCars={setCars}
                />
            )}
        </div>
    );
}

export default DashboardCars;
