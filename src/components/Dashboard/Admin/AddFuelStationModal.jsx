
import styles from "../../../styles/addfuelstationmodal.module.css"
import React from "react";

const AddFuelStationModal = ({ showModal, setShowModal, handleAddFuelStation, newFuelStationData, handleNewFuelStationChange }) => {
    return (
        showModal && (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <h2>Добавить заправочную станцию</h2>
                    <form className={styles['form-addfuelstation']} onSubmit={handleAddFuelStation}>
                        <label>
                            Название:
                            <input
                                type="text"
                                name="name"
                                value={newFuelStationData.name}
                                onChange={handleNewFuelStationChange}
                            />
                        </label>
                        <label>
                            Местоположение:
                            <input
                                type="text"
                                name="location"
                                value={newFuelStationData.location}
                                onChange={handleNewFuelStationChange}
                            />
                        </label>
                        <label>
                            Широта:
                            <input
                                type="text"
                                name="latitude"
                                value={newFuelStationData.latitude}
                                onChange={handleNewFuelStationChange}
                            />
                        </label>
                        <label>
                            Долгота:
                            <input
                                type="text"
                                name="longitude"
                                value={newFuelStationData.longitude}
                                onChange={handleNewFuelStationChange}
                            />
                        </label>
                        <article className={styles['btns']}>
                            <button type="submit">Добавить</button>
                            <button className={styles.closeButton} onClick={() => setShowModal(false)}>Закрыть</button>
                        </article>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddFuelStationModal;