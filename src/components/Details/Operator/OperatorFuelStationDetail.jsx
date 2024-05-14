import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../../../styles/adminfuelstaiondetail.module.css';
import EditFuelStationForm from "../../Dashboard/Admin/EditFuelStationForm.jsx";
import FillFuelForm from "../../Dashboard/Admin/FillFuelForm.jsx";
import AddFuelColumnForm from "../../Dashboard/Admin/AddFuelColumnForm.jsx";

import {API} from "../../../utils/APi";
import FillColumnForm from "../Admin/FillColumnForm";

function OperatorFuelStationDetail(props) {
    const [fuelStation, setFuelStation] = useState(null);
    const [fuelAmount, setFuelAmount] = useState('');
    const { fuelStationId } = useParams();
    const token = localStorage.getItem('token');
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [fillingColumn, setFillingColumn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/fuelstation/${fuelStationId}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setFuelStation(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [fuelStationId, token]);

    useEffect(() => {
        const fetchFuelTypes = async () => {
            try {
                const response = await axios.get(`${API}/fuelstation/fueltypes`);
            } catch (error) {
                console.error('Ошибка при получении типов топлива:', error);
            }
        };

        fetchFuelTypes();
    }, []);


    const handleFuelAmountChange = (e) => {
        setFuelAmount(e.target.value);
    };


    const openFillColumnForm = (columnId) => {
        setSelectedColumnId(columnId);
        setFillingColumn(true);
    };

    const fillColumn = async () => {
        try {
            const currentFuelQuantity = parseFloat(fuelStation.fuel_columns.find(col => col.id === selectedColumnId).fuel_quantity);
            const additionalFuelAmount = parseFloat(fuelAmount);
            const updatedFuelQuantity = currentFuelQuantity + additionalFuelAmount;

            const response = await axios.patch(
                `${API}/fuelstation/${fuelStationId}/fuelcolumn/${selectedColumnId}/`,
                { fuel_quantity: updatedFuelQuantity },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            const updatedResponse = await axios.get(`${API}/fuelstation/${fuelStationId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFuelStation(updatedResponse.data);
            console.log('Топливо успешно добавлено в колонку:', response.data);
            setFillingColumn(false);
            setSelectedColumnId(null);
            setFuelAmount('');
        } catch (error) {
            console.error('Ошибка при добавлении топлива в колонку:', error);
        }
    };

    const cancelFillColumn = () => {
        setFillingColumn(false);
        setSelectedColumnId(null);
        setFuelAmount('');
    };


    return (
        <div className={styles.container}>
            {fuelStation && (
                <div className={styles.fuelstation}>
                        <div className={styles["fuelstation-details"]}>
                            <h2>{fuelStation.name}</h2>
                            <p>Местоположение: {fuelStation.location}</p>
                            <p>Широта: {fuelStation.latitude}</p>
                            <p>Долгота: {fuelStation.longitude}</p>
                            <p>Общее количество топлива: {fuelStation.fuel_columns.reduce((acc, column) => acc + parseFloat(column.fuel_quantity), 0)}</p>
                            <h3>Типы топлива:</h3>
                            <ul>
                                {fuelStation.fuel_types.map((fuelType, index) => (
                                    <li key={index}>
                                        {fuelType.name} (Октановое число: {fuelType.octane_number})
                                    </li>
                                ))}
                            </ul>
                            <h3>Колонки с топливом:</h3>
                            <ul>
                                {fuelStation.fuel_columns.map((fuelColumn, index) => (
                                    <li key={index}>
                                        Колонка {fuelColumn.number}: Количество топлива: {fuelColumn.fuel_quantity},
                                        Цена за литр: {fuelColumn.price_per_liter}
                                        <button onClick={() => openFillColumnForm(fuelColumn.id)}>Залить</button>
                                    </li>
                                ))}
                                {fillingColumn && selectedColumnId && (
                                    <FillColumnForm
                                        columnId={selectedColumnId}
                                        fuelAmount={fuelAmount}
                                        handleFuelAmountChange={handleFuelAmountChange}
                                        fillColumn={fillColumn}
                                        cancelFillColumn={cancelFillColumn}
                                    />
                                )}
                            </ul>
                        </div>
                </div>
            )}
        </div>
    );
}

export default OperatorFuelStationDetail;
