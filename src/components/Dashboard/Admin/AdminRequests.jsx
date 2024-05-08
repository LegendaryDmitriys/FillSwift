import React, {useState} from 'react';
import AdminRefuelingRequests from "./AdminRefuelingRequests";
import AdminPurchaseRequests from "./AdminPurchaseRequests";


import styles from '../../../styles/request.module.css'
import HeaderBoard from "../HeaderBoard";

function AdminRequests(props) {
    const [showRefuelingRequests, setShowRefuelingRequests] = useState(true);
    const handleToggleComponent = () => {
        setShowRefuelingRequests(prevState => !prevState);
    };

    return (
        <div>
            <HeaderBoard title={"Запросы"} description={"Здесь все запросы на покупку топлива и продуктов"}/>
            <button  className={styles['btn-switch']} onClick={handleToggleComponent}>
                {showRefuelingRequests ? 'Заправки' : 'Продукты'}
            </button>
            {showRefuelingRequests ? <AdminRefuelingRequests/> : <AdminPurchaseRequests/>}
        </div>
    );
}

export default AdminRequests;