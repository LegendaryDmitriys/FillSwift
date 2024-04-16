    import React, {useState} from 'react';

    import styles from '../../styles/modaltypefuels.module.css'
    import ModalFuelQuantity from "./modalFuelQuantity";
    const ModalTypeFuels = ({ numberColumn,gasStation, onClose }) => {
        const [modalOpen, setModalOpen] = useState(false);
        const [octaneNumber, setOctaneNumber] = useState(null);
        const [pricePerLiter, setPricePerLiter] = useState(null);
        const [selectedColumnNumber, setSelectedColumnNumber] = useState(null);
        const openModal = (octaneNumber, pricePerLiter,columnNumber) => {
            setOctaneNumber(octaneNumber);
            setPricePerLiter(pricePerLiter);
            setSelectedColumnNumber(columnNumber);
            setModalOpen(true);
        };

        const selectedColumnIndex = gasStation.fuel_columns.findIndex(column => column.number === numberColumn);
        const selectedColumn = selectedColumnIndex !== -1 ? gasStation.fuel_columns[selectedColumnIndex] : null;
        const selectedFuelType = selectedColumn ? gasStation.fuel_types[selectedColumnIndex] : null;

        return (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
                    <h2>Колонка {numberColumn}</h2>
                    <p>FillSwift</p>
                    {selectedColumn && selectedFuelType && (
                        <div className={styles['typefuels']}>
                            <table>
                                <tbody>
                                <tr onClick={() => openModal(selectedFuelType.octane_number, selectedColumn.price_per_liter, numberColumn)}>
                                    <td>{selectedFuelType.octane_number}</td>
                                    <td></td>
                                    <td>{selectedColumn.price_per_liter} ₽ <span>></span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    <span>Выберите тип топлива</span>
                </div>
                {modalOpen && <ModalFuelQuantity octaneNumber={octaneNumber} pricePerLiter={pricePerLiter} numberColumn={selectedColumnNumber} onClose={() => setModalOpen(false)} />}
            </div>
        );
    };

    export default ModalTypeFuels

