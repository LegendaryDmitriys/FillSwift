import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderBoard from "../HeaderBoard";
import styles from "../../../styles/admindashboardfueltypes.module.css";
import ReactPaginate from 'react-paginate';
import sprite from "../../../sprite.svg";
import AddFuelTypesModal from "./AddFuelTypesModal";

function AdminFuelType(props) {
    const [fuelTypes, setFuelTypes] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [newFuelType, setNewFuelType] = useState({
        name: '',
        octane_number: ''
    });
    const [showForm, setShowForm] = useState(false);
    const fuelTypesPerPage = 5;

    useEffect(() => {
        const fetchFuelTypes = async () => {
            try {
                const response = await axios.get('http://192.168.0.106:8000/fuelstation/fueltypes/');
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
                    <td>
                        <button onClick={() => deleteFuelType(fuelType.id)}>Удалить</button>
                    </td>
                </tr>
            ));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFuelType({
            ...newFuelType,
            [name]: value
        });
    };

    const addFuelType = async () => {
        try {
            const response = await axios.post(
                'http://192.168.0.106:8000/fuelstation/fueltypes/',
                newFuelType
            );
            console.log('Тип топлива успешно добавлен:', response.data);
            setFuelTypes([...fuelTypes, response.data]);
            setNewFuelType({
                name: '',
                octane_number: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Ошибка при добавлении типа топлива:', error);
        }
    };

    const deleteFuelType = async (fuelTypeId) => {
        try {
            await axios.delete(`http://192.168.0.106:8000/fuelstation/fueltypes/${fuelTypeId}/`);
            console.log('Тип топлива успешно удален');
            setFuelTypes(fuelTypes.filter(fuelType => fuelType.id !== fuelTypeId));
        } catch (error) {
            console.error('Ошибка при удалении типа топлива:', error);
        }
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
                <div className={styles['iteraction']}>
                    <div className={styles['addButton-container']}>
                        <button className={styles["addButton"]} onClick={() => setShowForm(true)}>Добавить</button>
                    </div>
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
                        <th>ID</th>
                        <th>Название</th>
                        <th>Октановое число</th>
                        <th>Действие</th>
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
            <AddFuelTypesModal
                showForm={showForm}
                setShowForm={setShowForm}
                addFuelType={addFuelType}
                handleInputChange={handleInputChange}
                newFuelType={newFuelType}
            />
        </div>
    );
}

export default AdminFuelType;
