import React from 'react';


import styles from '../../styles/dashboardbasket.module.css'
import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";
import sprite from "../../sprite.svg";
import MinSideBar from "./MinSideBar";


function DashboardBasket(props) {
    return (
        <div className={styles.dashboard}>
            <div>
                <Sidebar/>
            </div>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"Корзина товаров"} description={"Здесь хранятся все выбранные вами товары"}/>
                <div className={styles.basket}>
                    <div className={styles["basket-content"]}>
                        <div className={styles["basket-products"]}>
                            <div className={styles["basket-product"]}>
                                <div className={styles["basket-img"]}>
                                    <img src="https://ltdfoto.ru/images/2024/02/18/1.png" alt="img"/>
                                </div>
                                <div className={styles["basket-info"]}>
                                    <article>
                                        <h2>Масло SintecS</h2>
                                        <span>1 л</span>
                                    </article>
                                    <button>Удалить</button>
                                </div>
                                <div className={styles["basket-price"]}>
                                    <article>
                                        <h3>500p</h3>
                                        <p>Cкидка 270 P <span>500 P</span></p>
                                    </article>
                                </div>
                            </div>
                            <div className={styles["basket-product"]}>
                                <div className={styles["basket-img"]}>
                                    <img src="https://ltdfoto.ru/images/2024/02/18/1.png" alt="img"/>
                                </div>
                                <div className={styles["basket-info"]}>
                                    <article>
                                        <h2>Масло SintecS</h2>
                                        <span>1 л</span>
                                    </article>
                                    <button>Удалить</button>
                                </div>
                                <div className={styles["basket-price"]}>
                                    <article>
                                        <h3>500p</h3>
                                        <p>Cкидка 270 P <span>500 P</span></p>
                                    </article>
                                </div>
                            </div>
                            <div className={styles["basket-product"]}>
                                <div className={styles["basket-img"]}>
                                    <img src="https://ltdfoto.ru/images/2024/02/18/1.png" alt="img"/>
                                </div>
                                <div className={styles["basket-info"]}>
                                    <article>
                                        <h2>Масло SintecS</h2>
                                        <span>1 л</span>
                                    </article>
                                    <button>Удалить</button>
                                </div>
                                <div className={styles["basket-price"]}>
                                    <article>
                                        <h3>500p</h3>
                                        <p>Cкидка 270 P <span>500 P</span></p>
                                    </article>
                                </div>
                            </div>

                        </div>
                        <div className={styles["basket-payment"]}>
                            <article className={styles["payment-header"]}>
                                <h4>Ваша корзина</h4>
                                <span>2 товара</span>
                            </article>
                            <article className={styles["payment-allprice"]}>
                                <h4>Товары(2)</h4>
                                <span>1000Р</span>
                            </article>
                            <article className={styles["payment-discount"]}>
                                <h4>Скидка</h4>
                                <span>- 275р</span>
                            </article>
                            <div className={styles["payment-btn"]}>
                                <button>Перейти к оформлению</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardBasket;