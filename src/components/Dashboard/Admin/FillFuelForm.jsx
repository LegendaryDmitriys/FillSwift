import React from 'react';
import styles from "../../../styles/fuelstationform.module.css";

function FillFuelForm({ fuelAmount, handleFuelAmountChange, fillFuel }) {
    return (
        <div className={styles.container}>
            <div className={styles.editfuel}>
                <h2>Заливка топлива</h2>
                <label className={styles.label}>
                    Количество топлива:
                    <input
                        type="text"
                        value={fuelAmount}
                        onChange={handleFuelAmountChange}
                    />
                </label>
                <button onClick={fillFuel} className={styles['btn-save']}>Залить топливо</button>
            </div>
        </div>
    );
}

export default FillFuelForm;
