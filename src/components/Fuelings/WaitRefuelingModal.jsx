import React, { useState, useEffect } from 'react';
import axios from 'axios';



import styles from '../../styles/waitrefuelingmodal.module.css'
import {API} from "../../utils/APi";
const WaitRefuelingModal = ({ refuelingId, onClose }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`${API}/refuling/refuelings/${refuelingId}`)
                .then(response => {
                    const status = response.data.status;
                    if (status === 'confirmed') {
                        setLoading(false);
                        clearInterval(interval);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при получении статуса заправки:', error);
                    clearInterval(interval);
                });
        }, 2000);

        return () => clearInterval(interval);
    }, [refuelingId]);

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles['modal-content']}>
                <h2>Дождитесь заправки</h2>
                {loading ? (
                    <div className={styles.loader}></div>
                ) : (
                    <p>Заправка подтверждена. Спасибо!</p>
                )}
                <button onClick={handleClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default WaitRefuelingModal;
