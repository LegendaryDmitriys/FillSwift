import React, { useEffect, useState } from 'react';
import styles from '../../styles/modalfuels.module.css';
import ModalColumn from './ModalColumn.jsx';
import axios from 'axios';
import {API} from "../../utils/APi";

const ModalFuels = ({ fuelStation, onClose }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [fuelTypes, setFuelTypes] = useState([]);

    useEffect(() => {
        async function fetchFuelTypes() {
            try {
                const response = await axios.get(`${API}/fuelstation/${fuelStation.id}/`);
                setFuelTypes(response.data.fuel_types);
            } catch (error) {
                console.error('Ошибка при получении данных о типах топлива на заправке:', error);
            }
        }

        if (fuelStation) {
            fetchFuelTypes();
        }
    }, [fuelStation]);

    const openModal = (fuelType) => {
        setSelectedFuelType(fuelType);
        setModalOpen(true);
    };


    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    Закрыть
                </button>
                {fuelStation && (
                    <>
                        <h2>{fuelStation.name}</h2>
                        <p>{fuelStation.location}</p>
                        <div className={styles['button-container']}>
                            <div className={styles['button-fuels']}>
                                <button onClick={openModal}>Заправиться</button>
                            </div>
                            <div className={styles['button-route']}>
                                <button><a href={`https://yandex.ru/maps/24/veliky-novgorod/?ll=${fuelStation.longitude}%2C${fuelStation.latitude}&mode=whatshere&whatshere%5Bpoint%5D=${fuelStation.longitude}%2C${fuelStation.latitude}&whatshere%5Bzoom%5D=13.97&z=15`}>Построить маршрут</a></button>
                            </div>
                        </div>
                        <div className={styles['typefuels-gastation']}>
                            <h3>Имеющиеся топлива</h3>
                            <table>
                                <tbody>
                                {fuelTypes.map((fuelType, index) => (
                                    <tr key={index}>
                                        <td>{fuelType.name} {fuelType.octane_number}</td>
                                        <td>{fuelStation.fuel_columns[index].number}</td>
                                        <td>{fuelStation.fuel_columns[index].price_per_liter} ₽</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
            <div>{modalOpen && <ModalColumn  fuelStationId={fuelStation.id} fuelTypes={selectedFuelType} onClose={() => setModalOpen(false)} />}</div>
        </div>
    );
};

export default ModalFuels;
