import React from 'react';

import styles from '../../../styles/fuelstationform.module.css'

function EditFuelStationForm({ editedFuelStation, handleInputChange, handleNewColumnChange, fuelTypes, updateFuelStation, cancelEdit }) {
    return (
        <div className={styles.container}>
            <div className={styles.editfuel}>
                <h2>Редактирование заправочной станции</h2>
                <label className={styles.label}>
                    Название:
                    <input
                        type="text"
                        name="name"
                        value={editedFuelStation.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Местоположение:
                    <input
                        type="text"
                        name="location"
                        value={editedFuelStation.location}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Широта:
                    <input
                        type="text"
                        name="latitude"
                        value={editedFuelStation.latitude}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Долгота:
                    <input
                        type="text"
                        name="longitude"
                        value={editedFuelStation.longitude}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Количество топлива:
                    <input
                        type="text"
                        name="fuel_quantity"
                        value={editedFuelStation.fuel_quantity}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Тип топлива:
                    <select
                        name="fuel_type"
                        value={editedFuelStation.fuel_type}
                        onChange={handleInputChange}
                    >
                        <option value="">Выберите тип топлива</option>
                        {fuelTypes.map((fuelType, index) => (
                            <option key={index} value={fuelType.id}>{fuelType.name} {fuelType.octane_number}</option>
                        ))}
                    </select>
                </label>
                <button onClick={updateFuelStation} className={styles['btn-save']}>Сохранить изменения</button>
                <button onClick={cancelEdit} className={styles["btn-cancel"]}>Отмена</button>
            </div>
        </div>
    );
}

export default EditFuelStationForm;
