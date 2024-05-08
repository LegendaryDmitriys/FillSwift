import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import styles from '../../../styles/dashboardproducts.module.css';
import HeaderBoard from '../HeaderBoard';
import sprite from "../../../sprite.svg";
import ReactPaginate from 'react-paginate';
import AddProductModal from './AddProductModal';

function Products(props) {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        product_type: '',
        price_per_unit: 0,
        manufacturer: '',
        image: ''
    });
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 5;

    useEffect(() => {
        axios
            .get('http://192.168.0.106:8000/products/products/')
            .then((productsResponse) => {
                setProducts(productsResponse.data);
            })
            .catch((error) => {
                console.error('Ошибка получения данных:', error);
            });
    }, []);

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
                    <td>
                        <Link to={`${ROUTES.AdminProductsDetails}/${product.id}`}>
                            <svg width={24} height={19} className={styles['icon-action']}>
                                <use xlinkHref={sprite + "#arrow-left"} />
                            </svg>
                        </Link>
                    </td>
                </tr>
            ));
    };

    const handleAddProductClick = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('quantity', newProduct.quantity);
        formData.append('product_type', newProduct.product_type);
        formData.append('price_per_unit', newProduct.price_per_unit);
        formData.append('manufacturer', newProduct.manufacturer);
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(
                'http://192.168.0.106:8000/products/products/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setProducts([...products, response.data]);
            setShowModal(false);
            setNewProduct({
                name: '',
                description: '',
                quantity: 0,
                product_type: '',
                price_per_unit: 0,
                manufacturer: '',
            });
            setSelectedFile(null);
        } catch (error) {
            console.error('Ошибка при создании продукта:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
            <HeaderBoard
                title={'Товары'}
                description={'Здесь отображаются все товары в магазине'}
            />
            <div className={styles.products}>
                <div className={styles['iteraction']}>
                    <div className={styles['addButton-container']}>
                        <button
                            onClick={handleAddProductClick}
                            className={styles["addButton"]}
                        >
                            Добавить
                        </button>
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
                <table className={styles.productTable}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Тип продукта</th>
                        <th>Цена</th>
                        <th>Производитель</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>{displayProducts()}</tbody>
                </table>
                <AddProductModal
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    newProduct={newProduct}
                    handleFileChange={handleFileChange}
                />
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

export default Products;
