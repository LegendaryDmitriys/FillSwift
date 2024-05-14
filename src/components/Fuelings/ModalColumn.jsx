import React, {useEffect, useState} from 'react';

import styles from '../../styles/modal.module.css'
import ModalTypeFuels from "./modalTypeFuels.jsx";
import axios from "axios";
import {API} from "../../utils/APi";
const ModalColumn = ({ onClose,fuelStationId, selectedFuelType}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFuelColumn, setSelectedFuelColumn] = useState(null);
    const [fuelColumns, setFuelColumns] = useState([]);
    const [gasStation, setGasStation] = useState([])

    useEffect(() => {
        async function fetchFuelColumns() {
            try {
                const response = await axios.get(`${API}/fuelstation/${fuelStationId}/`);
                setGasStation(response.data);
                setFuelColumns(response.data.fuel_columns);
            } catch (error) {
                console.error('Ошибка при получении данных о типах топлива на заправке:', error);
            }
        }

        if (fuelStationId) {
            fetchFuelColumns();
        }
    }, [fuelStationId]);


    const openModal = (fuelColumn) => {
        setSelectedFuelColumn(fuelColumn);
        setModalOpen(true);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
                <h2>FillSwift</h2>
                <p>{gasStation.location}</p>
                <div className={styles["fueling-column__container"]}>
                    {fuelColumns.map((column, index) => (
                        <div className={styles["fueling-column__item"]} key={index} onClick={() => openModal(index + 1)}>
                            <h2>{column.number}</h2>
                            <article>
                                <p>{gasStation.fuel_types[index].octane_number}</p>
                            </article>
                        </div>
                    ))}
                </div>
                <span>Выберите колонку</span>
            </div>
            {modalOpen && <ModalTypeFuels gasStation={gasStation} numberColumn={selectedFuelColumn} onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default ModalColumn

