import React, { useEffect, useState } from 'react';
import HeaderBoard from '../HeaderBoard.jsx';
import styles from '../../../styles/dashboardcustomers.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes.js';
import sprite from "../../../sprite.svg";
import ReactPaginate from 'react-paginate';
import {API} from "../../../utils/APi";

function Operators(props) {
    const [operators, setOperators] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const operatorsPerPage = 5;

    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const responseOperators = await axios.get(`${API}/api/user-list`);
                const operatorUsers = responseOperators.data.filter(user => user.operator);
                setOperators(operatorUsers);
            } catch (error) {
                console.error('Ошибка загрузки операторов:', error);
            }
        };

        fetchOperators();
    }, []);

    const pageCount = Math.ceil(operators.length / operatorsPerPage);
    const pagesVisited = pageNumber * operatorsPerPage;

    const displayUsers = () => {
        return operators
            .filter(user =>
                user.firstname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                user.lastname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                user.email.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + operatorsPerPage)
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <Link to={`${ROUTES.CustomersDetails}/${user.id}`}>
                            <svg width={24} height={19} className={styles['icon-action']}>
                                <use xlinkHref={sprite + "#arrow-left"}/>
                            </svg>
                        </Link>
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
            <HeaderBoard title={'Операторы'} description={'Здесь отображаются все операторы зарегистрированные в системе'} />
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
                        <th></th>
                        <th></th>
                        <th></th>
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
                        странице: {pageNumber * operatorsPerPage + 1}–{(pageNumber + 1) * operatorsPerPage} из {operators.length}
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

export default Operators;
