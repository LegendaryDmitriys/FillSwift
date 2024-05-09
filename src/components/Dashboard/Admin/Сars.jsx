import React, { useEffect, useState } from 'react';
import HeaderBoard from '../HeaderBoard.jsx';
import styles from '../../../styles/admindashboardcars.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes.js';
import sprite from "../../../sprite.svg";
import ReactPaginate from 'react-paginate';

function Cars(props) {
    const [cars, setCars] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const carsPerPage = 5;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/cars/users/');
                setCars(response.data);
            } catch (error) {
                console.error('Ошибка загрузки автомобилей:', error);
            }
        };

        fetchCars();
    }, []);

    const pageCount = Math.ceil(cars.length / carsPerPage);
    const pagesVisited = pageNumber * carsPerPage;

    const displayCars = () => {
        return cars
            .filter(car =>
                car.registration_number.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                car.brand_name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                car.model_name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + carsPerPage)
            .map(car => (
                <tr key={car.id}>
                    <td>{car.registration_number}</td>
                    <td>{car.brand_name}</td>
                    <td>{car.model_name}</td>
                    <td>
                        <Link to={`${ROUTES.CarsDetails}/${car.id}`}>
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
            <HeaderBoard title={'Автомобили'} description={'Здесь отображаются все автомобили зарегистрированные в системе'} />
            <div className={styles.cars}>
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
                        <th>Регистрационный номер</th>
                        <th>Марка</th>
                        <th>Модель</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayCars()}
                    </tbody>
                </table>
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationText}>
                        Строк на
                        странице: {pageNumber * carsPerPage + 1}–{(pageNumber + 1) * carsPerPage} из {cars.length}
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

export default Cars;
