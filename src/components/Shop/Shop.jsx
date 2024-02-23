import React from 'react';


import styles from "../../styles/shop.module.css"
import sprite from "../../sprite.svg";
import Header from "../Header/Header";
const Shop = (props) => (
    <section>
        <Header/>
        <div className={styles.wrapper}>
            <section className={styles["header-container"]}>
                <h1>Магазин</h1>
                <p>Добро пожаловать в FillSwift, вашем идеальном месте, где ваши потребности в автотопливе соответствуют
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
                            <p>Энергия для Дороги: Разнообразие Продуктов Питания на АЗС для Ваших Вкусовых Предпочтений
                                и Загруженного Образа Жизни</p>
                        </div>
                        <div className={styles.card}>
                            <article className={styles["card-heading"]}>
                                <svg width={83} height={83}>
                                    <use xlinkHref={sprite + "#auto"}/>
                                </svg>
                                <h3>Товары для ухода за автомобилем</h3>
                            </article>
                            <p>Берегите свой автомобиль, как заслуживает: Найдите все необходимые средства для ухода и
                                поддержания великолепного состояния вашего транспортного средства.</p>
                        </div>
                    </div>
                    <div className={styles["cards-subcontainer"]}>
                        <div className={styles.card}>
                            <article className={styles["card-heading"]}>
                                <svg width={83} height={83}>
                                    <use xlinkHref={sprite + "#hygiene"}/>
                                </svg>
                                <h3>Средства личной гигиены и бытовая химия</h3>
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
                            <p>Быстрый перекус в пути: Насладитесь разнообразием фаст-фуда и напитков на наших АЗС для
                                зарядки энергией и удовлетворения ваших вкусовых предпочтений.</p>
                        </div>
                        <div className={styles.card}>
                            <article className={styles["card-heading"]}>
                                <svg width={83} height={83}>
                                    <use xlinkHref={sprite + "#gadget"}/>
                                </svg>
                                <h3>Мелкая техника и гаджеты</h3>
                            </article>
                            <p>Современные технологии в вашем автомобиле: Исследуйте удивительный мир мелкой техники и
                                гаджетов на наших АЗС для удобства и разнообразия в вашем путешествии.</p>
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
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className={styles["products-container"]}>
                <svg width={69} height={30}>
                    <use xlinkHref={sprite + "#stars"}/>
                </svg>
                <h2>Товары</h2>
                <div className={styles.sort}>
                    <p>Cортировать по:</p>
                    <article className={styles["button-sort"]}>
                        <button>Цена</button>
                        <button>Категория</button>
                        <button>Бренд</button>
                        <button>Количество на складе</button>
                    </article>
                </div>
                <section className={styles["products-items"]}>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles["products-items"]}>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles["products-items"]}>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src="https://www.tutu.ru/file/4/b024c1aad77e42d424c96720b4d60712/" alt=""/>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <p>
                                    Масло Sintec <br/>
                                    600
                                    P
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p>
                                    Уход за авто <br/>
                                    SintecS
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </section>
);

export default Shop;