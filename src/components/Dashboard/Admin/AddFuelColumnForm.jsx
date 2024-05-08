import React from 'react';

import styles from '../../../styles/editcarform.module.css'

function AddFuelColumnForm({ newColumn, handleNewColumnChange, fuelTypes, addColumn, cancelAddColumn }) {
    return (
        <div className={styles.container}>
            <div className={styles.editfuel}>
                <h2>Добавить колонку</h2>
                <label className={styles.label}>
                    Номер:
                    <input
                        type="text"
                        name="number"
                        value={newColumn.number}
                        onChange={handleNewColumnChange}
                    />
                </label>
                <label className={styles.label}>
                    Количество топлива:
                    <input
                        type="text"
                        name="fuel_quantity"
                        value={newColumn.fuel_quantity}
                        onChange={handleNewColumnChange}
                    />
                </label>
                <label className={styles.label}>
                    Цена за литр:
                    <input
                        type="text"
                        name="price_per_liter"
                        value={newColumn.price_per_liter}
                        onChange={handleNewColumnChange}
                    />
                </label>
                <label className={styles.label}>
                    Тип топлива:
                    <select
                        name="fuel_type"
                        value={newColumn.fuel_type}
                        onChange={handleNewColumnChange}
                    >
                        <option value="">Выберите тип топлива</option>
                        {fuelTypes.map((fuelType, index) => (
                            <option key={index} value={fuelType.id}>{fuelType.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={addColumn} className={styles['btn-save']}>Сохранить изменения</button>
                <button onClick={cancelAddColumn} className={styles["btn-cancel"]}>Отмена</button>
            </div>
        </div>
    );
}

export default AddFuelColumnForm;
