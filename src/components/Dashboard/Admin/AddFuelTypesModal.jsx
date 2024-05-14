import React, { useState } from 'react';
import styles from "../../../styles/addfueltyoesmodal.module.css";

function AddFuelTypesModal({ showForm, setShowForm, addFuelType, handleInputChange, newFuelType }) {
    if (!showForm) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setShowForm(false)}>&times;</span>
                <div className={styles['addproduct_form']}>
                    <div className={styles["types-settings"]}>
                        <h2 className={styles["type-title"]}>Добавить тип топлива</h2>
                        <input
                            type="text"
                            name="name"
                            value={newFuelType.name}
                            onChange={handleInputChange}
                            placeholder="Тип топлива"
                            className={styles['typefuels-form__input']}
                        />
                    </div>
                    <div className={styles["types-settings"]}>
                        <h2 className={styles["octane-title"]}>Октановое число</h2>
                        <input
                            type="text"
                            name="octane_number"
                            value={newFuelType.octane_number}
                            onChange={handleInputChange}
                            placeholder="Октановое число"
                            className={styles['typefuels-form__input']}
                        />
                        <button onClick={addFuelType} className={styles['types-add']}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFuelTypesModal;
