import React, {useEffect, useState} from 'react';
import HeaderBoard from "../HeaderBoard";
import styles from '../../../styles/dashboardcustomers.module.css'
import axios from "axios";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../utils/routes";

function Customers(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/api/user-list');
                setUsers(response.data);
            } catch (error) {
                console.error('Ошибка загрузки пользователей:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <HeaderBoard title={"Пользователи"} description={"Здесь отображаются все пользователи зарегестрированные в системе"}/>
            <div className={styles.customers}>
                <ul>
                    {users.map(user => (
                        <Link to={`${ROUTES.CustomersDetails}/${user.id}`}>
                            <li key={user.id}
                                className={styles['customer-item']}>
                                <img src={user.avatar ? user.avatar : '../images/avatar.jpeg'} alt=""/>
                                {user.email} - {user.firstname} {user.lastname}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Customers;