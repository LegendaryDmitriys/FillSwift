import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderBoard from "../HeaderBoard.jsx";
import styles from "../../../styles/admindashboardfueltypes.module.css";
import ReactPaginate from 'react-paginate';
import sprite from "../../../sprite.svg";
import {API} from "../../../utils/APi";

function OperatorTypeFuels(props) {
    const [fuelTypes, setFuelTypes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const fuelTypesPerPage = 5;

    useEffect(() => {
        const fetchFuelTypes = async () => {
            try {
                const response = await axios.get(`${API}/fuelstation/fueltypes/`);
                setFuelTypes(response.data);
            } catch (error) {
                console.error('Ошибка загрузки типов топлива:', error);
            }
        };

        fetchFuelTypes();
    }, []);

    const pageCount = Math.ceil(fuelTypes.length / fuelTypesPerPage);
    const pagesVisited = pageNumber * fuelTypesPerPage;

    const displayFuelTypes = () => {
        return fuelTypes
            .filter(fuelType =>
                fuelType.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                fuelType.octane_number.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + fuelTypesPerPage)
            .map(fuelType => (
                <tr key={fuelType.id}>
                    <td>{fuelType.id}</td>
                    <td>{fuelType.name}</td>
                    <td>{fuelType.octane_number}</td>
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
            <HeaderBoard title={"Типы топлива"} description={"Здесь отображаются все типы топлива зарегистрированные в системе"} />
            <div className={styles.fueltypes}>
                <div className={styles['iteraction-s']}>
                    <form action="">
                        <div className={styles["form-input"]}>
                            <svg width={24} height={24} className={styles["icon-search-o"]}>
                                <use xlinkHref={sprite + "#glass"}/>
                            </svg>
                            <input type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearchChange}/>
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Октановое число</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayFuelTypes()}
                    </tbody>
                </table>
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationText}>
                        Строк на
                        странице: {pageNumber * fuelTypesPerPage + 1}–{(pageNumber + 1) * fuelTypesPerPage} из {fuelTypes.length}
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

export default OperatorTypeFuels;
