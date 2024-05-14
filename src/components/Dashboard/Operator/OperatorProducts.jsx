import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../styles/dashboardproducts.module.css';
import HeaderBoard from '../HeaderBoard.jsx';
import sprite from "../../../sprite.svg";
import ReactPaginate from 'react-paginate';

import {API} from "../../../utils/APi";

function OperatorProducts(props) {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 5;

    useEffect(() => {
        axios
            .get(`${API}/products/products/`)
            .then((productsResponse) => {
                setProducts(productsResponse.data);
            })
            .catch((error) => {
                console.error('Ошибка получения данных:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPageNumber(0);
    };

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const pageCount = Math.ceil(products.length / productsPerPage);
    const pagesVisited = pageNumber * productsPerPage;

    const displayProducts = () => {
        return products
            .filter(product =>
                product.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                product.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                product.product_type.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
                product.manufacturer.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
            )
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((product) => (
                <tr key={product.id}>
                    <td className={styles["products-base"]}>
                        <img
                            className={styles["product-img"]}
                            src={
                                product.images.length > 0
                                    ? product.images[0].image
                                    : '../images/defaultProduct.png'
                            }
                            alt="productImage"
                        />
                        <article className={styles['products-name']}>
                            <p>{product.name}</p>
                            <span>{product.product_type}</span>
                        </article>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.product_type}</td>
                    <td>{product.price_per_unit}</td>
                    <td>{product.manufacturer}</td>
                </tr>
            ));
    };


    return (
        <div>
            <HeaderBoard
                title={'Товары'}
                description={'Здесь отображаются все товары в магазине'}
            />
            <div className={styles.products}>
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
                <table className={styles.productTable}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Тип продукта</th>
                        <th>Цена</th>
                        <th>Производитель</th>
                    </tr>
                    </thead>
                    <tbody>{displayProducts()}</tbody>
                </table>
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationText}>
                        Строк на
                        странице: {pageNumber * productsPerPage + 1}–{(pageNumber + 1) * productsPerPage} из {products.length}
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

export default OperatorProducts;
