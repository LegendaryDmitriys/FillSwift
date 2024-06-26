import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';
import SortPopup from './SortPopup.jsx';
import styles from '../../styles/shop.module.css';
import sprite from '../../sprite.svg';
import ReactPaginate from 'react-paginate';
import {API} from "../../utils/APi";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortOption, setSortOption] = useState(null);
    const productsPerPage = 9;
    const popularProductsDisplayCount = 3;
    const popularProductsRotationInterval = 5000;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsResponse, popularProductsResponse] = await Promise.all([
                    axios.get(`${API}/products/products/`),
                    axios.get(`${API}/products/popular-products/`)
                ]);
                setProducts(productsResponse.data);
                setPopularProducts(popularProductsResponse.data);
            } catch (error) {
                console.error('Ошибка получения данных:', error);
            }
        };

        fetchProducts();

        const popularProductsInterval = setInterval(fetchProducts, popularProductsRotationInterval);

        return () => clearInterval(popularProductsInterval);
    }, [sortOption]);

    const pageCount = Math.ceil(products.length / productsPerPage);
    const pagesVisited = pageNumber * productsPerPage;

    const displayProducts = () => {
        const sortedProducts = sortProducts();
        return sortedProducts
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map(product => (
                <div key={product.id} className={styles.item}>
                    <Link to={`${ROUTES.ProductDetails}/${product.id}`}>
                        {product.images.length > 0 && (
                            <img src={product.images[0].image} alt={product.name} className={styles.image} />
                        )}
                        <div className={styles.infoContainer}>
                            <div className={styles.left}>
                                <p className={styles.name}>
                                    {product.name}
                                </p>
                                <p className={styles.price}>
                                    {product.price_per_unit} {product.currency}
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p className={styles.type}>
                                    {product.product_type}
                                </p>
                                <p className={styles.manufacturer}>
                                    {product.manufacturer}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ));
    };

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const sortProducts = () => {
        switch (sortOption) {
            case 'Цена':
                return [...products].sort((a, b) => a.price_per_unit - b.price_per_unit);
            case 'Категория':
                return [...products].sort((a, b) => a.product_type.localeCompare(b.product_type));
            case 'Бренд':
                return [...products].sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
            case 'Количество на складе':
                return [...products].sort((a, b) => a.stock_quantity - b.stock_quantity);
            default:
                return products;
        }
    };

    const shuffledPopularProducts = popularProducts.sort(() => Math.random() - 0.5);

    return (
        <section>
            <div className={styles.wrapper}>
                <section className={styles["header-container"]}>
                    <h1>Магазин</h1>
                    <p>Добро пожаловать в FillSwift, вашем идеальном месте, где ваши потребности в автотопливе
                        соответствуют
                        рекомендациям экспертов. Исследуйте наш разнообразный выбор услуг, каждая из которых создана для
                        удовлетворения ваших уникальных потребностей и ожиданий.</p>
                </section>
                <section className={styles["text-container"]}>
                    <svg width={69} height={30}>
                        <use xlinkHref={sprite + "#stars"}/>
                    </svg>
                    <h2>Категории</h2>
                    <p>Для Вашего Автомобиля и Вас: Разнообразие Продуктов на Автозаправочной Станции</p>
                    <div className={styles.cards}>
                        <div className={styles["cards-subcontainer"]}>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#spares"}/>
                                    </svg>
                                    <h3>Автозапчасти и аксессуары</h3>
                                </article>
                                <p>Обеспечьте Своему Автомобилю Надежность и Стиль: Широкий Выбор Автозапчастей и
                                    Аксессуаров для Ваших Путешествий</p>
                            </div>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#restaur"}/>
                                    </svg>
                                    <h3>Продукты питания</h3>
                                </article>
                                <p>Энергия для Дороги: Разнообразие Продуктов Питания на АЗС для Ваших Вкусовых
                                    Предпочтений
                                    и Загруженного Образа Жизни</p>
                            </div>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#auto"}/>
                                    </svg>
                                    <h3>Товары для ухода за автомобилем</h3>
                                </article>
                                <p>Берегите свой автомобиль, как заслуживает: Найдите все необходимые средства для ухода
                                    и
                                    поддержания великолепного состояния вашего транспортного средства.</p>
                            </div>
                        </div>
                        <div className={styles["cards-subcontainer"]}>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#hygiene"}/>
                                    </svg>
                                    <h3>Личная гигиена и бытоовая химия</h3>
                                </article>
                                <p>Забота о вас и вашем автомобиле: Широкий выбор товаров для личной гигиени и бытовой
                                    химии, чтобы сделать ваше путешествие еще более комфортным.</p>
                            </div>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#fastFood"}/>
                                    </svg>
                                    <h3>Фаст-фуд и напитки</h3>
                                </article>
                                <p>Быстрый перекус в пути: Насладитесь разнообразием фаст-фуда и напитков на наших АЗС
                                    для
                                    зарядки энергией и удовлетворения ваших вкусовых предпочтений.</p>
                            </div>
                            <div className={styles.card}>
                                <article className={styles["card-heading"]}>
                                    <svg width={83} height={83}>
                                        <use xlinkHref={sprite + "#gadget"}/>
                                    </svg>
                                    <h3>Мелкая техника и гаджеты</h3>
                                </article>
                                <p>
                                    Современные технологии в вашем автомобиле: Исследуйте удивительный мир мелкой техники
                                    и
                                    гаджетов на наших АЗС для удобства и разнообразия в вашем путешествии.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles["bestsellers-container"]}>
                    <svg width={69} height={30}>
                        <use xlinkHref={sprite + "#stars"}/>
                    </svg>
                    <h2>Хиты продаж</h2>
                    <section className={styles["bestsellers-items"]}>
                        {shuffledPopularProducts.slice(0, popularProductsDisplayCount).map(product => (
                            <div key={product.id} className={`${styles.item} ${styles["bestsellers-item"]}`}>
                                <Link to={`${ROUTES.ProductDetails}/${product.id}`}>
                                    {product.images.length > 0 && (
                                        <img src={product.images[0].image} alt={product.name} className={styles.image}/>
                                    )}
                                    <div className={styles.infoContainer}>
                                        <div className={styles.left}>
                                            <p className={styles.name}>
                                                {product.name}
                                            </p>
                                            <p className={styles.price}>
                                                {product.price_per_unit} {product.currency}
                                            </p>
                                        </div>
                                        <div className={styles.right}>
                                            <p className={styles.type}>
                                                {product.product_type}
                                            </p>
                                            <p className={styles.manufacturer}>
                                                {product.manufacturer}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </section>
                </section>
                <section className={styles["products-container"]}>
                    <svg width={69} height={30}>
                        <use xlinkHref={sprite + "#stars"}/>
                    </svg>
                    <h2>Товары</h2>
                    <div className={styles.sort}>
                        <SortPopup setSortOption={setSortOption}/>
                    </div>
                    <section className={styles["products-items"]}>
                        {displayProducts()}
                    </section>
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
                </section>
            </div>
        </section>
    );
};

export default Shop;
