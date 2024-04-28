import React from 'react';
import styles from '../../styles/modalPurchaseHistory.module.css';
import { formatDate } from "../../utils/formateDate";

function ModalPurchaseHistory({ show, handleClose, purchaseHistory }) {
    const showHideClassName = show ? styles.displayBlock : styles.displayNone;

    return (
        <div className={`${styles.modal} ${showHideClassName}`}>
            <div className={`${styles.modal} ${showHideClassName}`}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={handleClose}>&times;</span>
                    <div className={styles.purchaseHistoryTitle}>История покупок</div>
                    <div className={styles.purchaseHistory}>
                        {purchaseHistory.map((purchase, index) => (
                            <div key={index} className={styles.purchaseItem}>
                                <p><strong>Дата покупки:</strong> {formatDate(purchase.purchase_date)}</p>
                                <p><strong>Общая цена:</strong> {purchase.total_price}P</p>
                                <div>
                                    {purchase.products.map((product, index) => (
                                        <div key={index} className={styles.productItem}>
                                            <p><strong>Продукт:</strong> {product.product.name}</p>
                                            <p><strong>Количество:</strong> {product.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPurchaseHistory;
