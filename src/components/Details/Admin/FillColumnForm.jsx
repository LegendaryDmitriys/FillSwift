import React from 'react';

function FillColumnForm({ columnId, fuelAmount, handleFuelAmountChange, fillColumn, cancelFillColumn }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        fillColumn();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
