import React from 'react';

import styles from '../../../styles/fuelstationform.module.css'

function FillColumnForm({ columnId, fuelAmount, handleFuelAmountChange, fillColumn, cancelFillColumn }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        fillColumn();
    };

    return (
        <div className={styles.container}>
            <form className={styles.editfuel} onSubmit={handleSubmit}>
                <label>
                    Количество топлива:
                    <input
                        type="number"
                        value={fuelAmount}
                        onChange={handleFuelAmountChange}
                    />
                </label>
                <button type="submit">Залить</button>
                <button onClick={cancelFillColumn}>Отмена</button>
            </form>
        </div>
    );
}

export default FillColumnForm;
