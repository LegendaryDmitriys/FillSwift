import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styles from '../../../styles/adminfuelstaiondetail.module.css';
import EditFuelStationForm from "../../Dashboard/Admin/EditFuelStationForm.jsx";
import AddFuelColumnForm from "../../Dashboard/Admin/AddFuelColumnForm.jsx";
import FillColumnForm from "./FillColumnForm.jsx";
import {API} from "../../../utils/APi";
import {ROUTES} from "../../../utils/routes";
import {toast} from "react-toastify";

function FuelStationDetail(props) {
    const [fuelStation, setFuelStation] = useState(null);
    const [editedFuelStation, setEditedFuelStation] = useState(null);
    const [editing, setEditing] = useState(false);
    const [fuelAmount, setFuelAmount] = useState('');
    const { fuelStationId } = useParams();
    const [newColumn, setNewColumn] = useState({
        number: '',
        fuel_quantity: '',
        price_per_liter: '',
        fuel_station: fuelStationId,
        fuel_type: ''
    });
    const [fuelTypes, setFuelTypes] = useState([]);
    const [showAddColumnForm, setShowAddColumnForm] = useState(false);
    const token = localStorage.getItem('token');
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [fillingColumn, setFillingColumn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/fuelstation/${fuelStationId}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setFuelStation(response.data);
                setEditedFuelStation(response.data);
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
                setFuelTypes(response.data);
            } catch (error) {
                console.error('Ошибка при получении типов топлива:', error);
            }
        };

        fetchFuelTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedFuelStation({
            ...editedFuelStation,
            [name]: value
        });
    };

    const handleNewColumnChange = (e) => {
        const { name, value } = e.target;
        setNewColumn({
            ...newColumn,
            [name]: value
        });
    };

    const updateFuelStation = async () => {
        try {
            const response = await axios.put(
                `${API}/fuelstation/${fuelStationId}/`,
                editedFuelStation,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
            setFuelStation(response.data);
            console.log('Заправочная станция успешно отредактирована:', response.data);
            setEditing(false);
        } catch (error) {
            console.error('Ошибка при редактировании заправочной станции:', error);
        }
    };

    const handleFuelAmountChange = (e) => {
        setFuelAmount(e.target.value);
    };

    const addColumn = async () => {
        try {
            const response = await axios.post(
                `${API}/fuelstation/fuelcolumn/${fuelStationId}`,
                newColumn,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
            console.log('Колонка успешно добавлена:', response.data);

            const updatedResponse = await axios.get(`${API}/fuelstation/${fuelStationId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            setFuelStation(updatedResponse.data);
        } catch (error) {
            console.error('Ошибка при добавлении колонки:', error);
        }
    };

    const deleteFuelStation = async () => {
        try {
            await axios.delete(`${API}/fuelstation/${fuelStationId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            toast.success('Заправочная станция успешно удалена');
            navigate(ROUTES.AdminFuelStation)
        } catch (error) {
            console.error('Ошибка при удалении заправочной станции:', error);
        }
    };

    const deleteFuelColumn = async (columnId) => {
        try {
            await axios.delete(`${API}/fuelstation/${fuelStationId}/fuelcolumn/${columnId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            toast.success('Колонка успешно удалена');
            const updatedResponse = await axios.get(`${API}/fuelstation/${fuelStationId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFuelStation(updatedResponse.data);
        } catch (error) {
            console.error('Ошибка при удалении колонки:', error);
        }
    };

    const cancelEdit = () => {
        setEditing(false);
        setEditedFuelStation(fuelStation);
    };

    const cancelAddColumn = () => {
        setNewColumn({
            number: '',
            fuel_quantity: '',
            price_per_liter: '',
            fuel_station: fuelStationId,
            fuel_type: ''
        });
        setShowAddColumnForm(false);
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
            toast.success('Топливо успешно добавлено в колонку:', response.data);
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
                    {!editing ? (
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
                                        <button className={styles['btn-delete']} onClick={() => deleteFuelColumn(fuelColumn.id)}>Удалить</button>
                                        <button className={styles['btn-fill']} onClick={() => openFillColumnForm(fuelColumn.id)}>Залить</button>
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
                            <button onClick={() => setEditing(true)}>Редактировать</button>
                            <button onClick={deleteFuelStation}>Удалить</button>
                            <button onClick={() => setShowAddColumnForm(true)}>Добавить колонку</button>
                        </div>
                    ) : (
                        <EditFuelStationForm
                            editedFuelStation={editedFuelStation}
                            handleInputChange={handleInputChange}
                            handleNewColumnChange={handleNewColumnChange}
                            fuelTypes={fuelTypes}
                            updateFuelStation={updateFuelStation}
                            cancelEdit={cancelEdit}
                        />
                    )}
                    {showAddColumnForm && (
                        <AddFuelColumnForm
                            newColumn={newColumn}
                            handleNewColumnChange={handleNewColumnChange}
                            fuelTypes={fuelTypes}
                            addColumn={addColumn}
                            cancelAddColumn={cancelAddColumn}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default FuelStationDetail;
