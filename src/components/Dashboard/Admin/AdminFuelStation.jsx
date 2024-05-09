import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderBoard from "../HeaderBoard.jsx";
import styles from "../../../styles/admindashboardfuelstation.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes.js";
import ReactPaginate from 'react-paginate';
import sprite from "../../../sprite.svg";

function AdminFuelStation(props) {
    const [fuelStations, setFuelStations] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const fuelStationsPerPage = 5;

    useEffect(() => {
        const fetchFuelStations = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/fuelstation/list/');
                setFuelStations(response.data);
            } catch (error) {
                console.error('Ошибка загрузки заправочных станций:', error);
            }
        };

        fetchFuelStations();
    }, []);

    const pageCount = Math.ceil(fuelStations.length / fuelStationsPerPage);
    const pagesVisited = pageNumber * fuelStationsPerPage;

    const displayFuelStations = () => {
        return fuelStations
            .filter(fuelStation =>
                fuelStation.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                fuelStation.location.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + fuelStationsPerPage)
            .map(fuelStation => (
                <tr key={fuelStation.id}>
                    <td>{fuelStation.name}</td>
                    <td>{fuelStation.location}</td>
                    <td>{fuelStation.fuel_quantity}</td>
                    <td>
                        <Link to={`${ROUTES.AdminFuelStationDetail}/${fuelStation.id}`}>
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
            <HeaderBoard title={"Заправочные станции"} description={"Здесь отображаются все заправочные станции"}/>
            <div className={styles.fuelstation}>
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
                        <th>Название</th>
                        <th>Местоположение</th>
                        <th>Количество топлива</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayFuelStations()}
                    </tbody>
                </table>
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationText}>
                        Строк на
                        странице: {pageNumber * fuelStationsPerPage + 1}–{(pageNumber + 1) * fuelStationsPerPage} из {fuelStations.length}
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

export default AdminFuelStation;
