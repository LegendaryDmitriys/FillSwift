import React, { useEffect, useState } from 'react';
import HeaderBoard from '../HeaderBoard';
import styles from '../../../styles/dashboardcustomers.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import sprite from "../../../sprite.svg";
import ReactPaginate from 'react-paginate';

function Customers(props) {
    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const usersPerPage = 5; // Количество пользователей на странице

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/api/user-list');
                const usersWithCounts = await Promise.all(response.data.map(async user => {
                    const countsResponse = await axios.get(`http://192.168.0.106:8000/user-history-count/${user.id}/`);
                    return { ...user, ...countsResponse.data };
                }));
                setUsers(usersWithCounts);
            } catch (error) {
                console.error('Ошибка загрузки пользователей:', error);
            }
        };

        fetchUsers();
    }, []);

    const pageCount = Math.ceil(users.length / usersPerPage);
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = () => {
        return users
            .filter(user =>
                user.firstname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                user.lastname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                user.email.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map(user => (
                <tr key={user.id}>
                    <td>
                        <Link to={`${ROUTES.CustomersDetails}/${user.id}`}>
                            <div className={styles["user-bio"]}>
                                <img className={styles["user-avatar"]} src={user.avatar || "../../images/avatar.png"} alt=""/>
                                <article className={styles["user-bio_text"]}>
                                    <p>{user.firstname} {user.lastname}</p>
                                    <p>{user.email}</p>
                                </article>
                            </div>
                        </Link>
                    </td>
                    <td>{user.refueling_count}</td>
                    <td>{user.purchase_count}</td>
                    <td>{user.total_spent}</td>
                    <td>
                        <svg width={24} height={19} className={styles['icon-action']}>
                            <use xlinkHref={sprite + "#arrow-left"}/>
                        </svg>
                    </td>
                </tr>
            ));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPageNumber(0);
    };

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <HeaderBoard title={'Пользователи'} description={'Здесь отображаются все пользователи зарегистрированные в системе'} />
            <div className={styles.customers}>
                <div className={styles['iteraction']}>
                    <form action="">
                        <div className={styles["form-input"]}>
                            <svg width={24} height={24} className={styles["icon-search"]}>
                                <use xlinkHref={sprite + "#glass"}/>
                            </svg>
                            <input type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearchChange}/>
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Заправок</th>
                        <th>Покупки</th>
                        <th>Потраченно</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayUsers()}
                    </tbody>
                </table>
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationText}>
                        Строк на
                        странице: {pageNumber * usersPerPage + 1}–{(pageNumber + 1) * usersPerPage} из {users.length}
                    </div>
                    <ReactPaginate
                        previousLabel={'Предыдущая'}
                        nextLabel={'Следующая'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={styles.paginationBttns}
                        previousLinkClassName={styles.previousBttn}
                        nextLinkClassName={styles.nextBttn}
                        disabledClassName={styles.paginationDisabled}
                        activeClassName={styles.paginationActive}
                    />
                    <div className={styles.paginationText}>
                        Cтраница: {pageNumber + 1}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customers;
