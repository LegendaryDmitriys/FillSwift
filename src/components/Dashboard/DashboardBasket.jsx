import React, {useEffect, useState} from 'react';
import axios from "axios";

import styles from '../../styles/dashboardbasket.module.css'

import HeaderBoard from "./HeaderBoard";


import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes";


function DashboardBasket(props) {
    const [basketProducts, setBasketProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBasketProducts() {
            try {
                const userResponse = await axios.get('http://192.168.0.106:8000/api/user', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                const userId = userResponse.data.user.id;
                const basketResponse = await axios.get(`http://192.168.0.106:8000/carts/baskets/${userId}/`);
                const basketId = basketResponse.data.id;

                const response = await axios.get(`http://192.168.0.106:8000/carts/basket-products/${basketId}`);
                const productsData = await Promise.all(response.data.map(async (item) => {
                    const productResponse = await axios.get(`http://192.168.0.106:8000/products/products/${item.product}`);
                    const totalPrice = productResponse.data.price_per_unit * item.quantity;
                    console.log(item)
                    return { ...item, productInfo: productResponse.data, totalPrice: totalPrice };
                }));
                setBasketProducts(productsData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Ошибка при получении продуктов из корзины:', error);
            }
        }
        fetchBasketProducts();
    }, []);

    const totalQuantity = basketProducts.reduce((acc, item) => acc + item.quantity, 0);


    const totalPrice = basketProducts.reduce((acc, item) => acc + (item.productInfo.price_per_unit * item.quantity), 0);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleRemoveFromBasket = async (productId) => {
        try {
            const userResponse = await axios.get('http://192.168.0.106:8000/api/user', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            const userId = userResponse.data.user.id;
            const basketResponse = await axios.get(`http://192.168.0.106:8000/carts/baskets/${userId}/`);
            const basketId = basketResponse.data.id;

            await axios.delete(`http://192.168.0.106:8000/carts/basket-products/${basketId}/${productId}`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });

            setBasketProducts(prevProducts => prevProducts.filter(item => item.product !== productId));
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };

    const productIds = basketProducts.map(item => item.id);

    const handleCheckout = async () => {
        try {
            const userResponse = await axios.get('http://192.168.0.106:8000/api/user', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            const userId = userResponse.data.user.id;


            const quantities = basketProducts.map(item => item.quantity);

            const response = await axios.post(`http://192.168.0.106:8000/carts/purchases/ `, {
                user: userId,
                total_price: totalPrice,
                productIds: productIds,
                quantities: quantities
            });
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при оформлении покупки:', error);
        }
    };


    return (
        <div className={styles.dashboard}>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"Корзина товаров"} description={"Здесь хранятся все выбранные вами товары"}/>
                <div className={styles.basket}>
                    <div className={styles["basket-content"]}>
                        {basketProducts.length === 0 ? (
                            <div className={styles.emptyBasket}>
                                <img src="../images/emptyBasket.png" alt=""/>
                                <article className={styles.emptyBasketText}>
                                    <p className={styles.emptyBasketMessage}>Ваша корзина пуста</p>
                                    <p className={styles.emptyBasketSuggestion}>Продолжите покупки, <Link to={ROUTES.Shop}>перейдя к каталогу товаров</Link></p>
                                </article>
                            </div>
                        ) : (
                            <div className={styles["basket-flex"]}>
                                <div className={styles["basket-products"]}>
                                    {basketProducts.map((item, index) => (
                                        <div key={index} className={styles['basket-product']}>
                                            <div className={styles['basket-img']}>
                                                {item.productInfo.images.length > 0 ? (
                                                    <img src={item.productInfo.images[0].image} alt="Product"/>
                                                ) : (
                                                    <img src="../images/defaultProduct.png" alt="Default"/>
                                                )}
                                            </div>
                                            <div className={styles['basket-info']}>
                                                <article>
                                                    <h2>{item.productInfo.name}</h2>
                                                    <span>{item.quantity} шт.</span>
                                                </article>
                                                <button onClick={() => handleRemoveFromBasket(item.product)}>Удалить</button>
                                            </div>
                                            <div className={styles['basket-price']}>
                                                <article>
                                                    <h3>{item.productInfo.price_per_unit} P</h3>
                                                </article>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles["basket-payment"]}>
                                    <article className={styles["payment-header"]}>
                                        <h4>Ваша корзина</h4>
                                        <span>{totalQuantity} товара</span>
                                    </article>
                                    <article className={styles["payment-allprice"]}>
                                        <h4>Товары({totalQuantity})</h4>
                                        <span>{totalPrice}P</span>
                                    </article>
                                    <article className={styles["payment-discount"]}>
                                    </article>
                                    <div className={styles["payment-btn"]}>
                                        <button onClick={handleCheckout}>Перейти к оформлению</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardBasket;