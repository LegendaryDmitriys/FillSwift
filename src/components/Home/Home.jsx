import React from 'react';


import styles from "../../styles/home.module.css"
import Header from "../Header/Header";


const Home = (props) => (
    <section className={styles.home}>
        <Header/>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles["content-left"]}>
                    <h2 className={styles["fill-header"]}>
                        Открой Для Себя <br/>Заправку Своей Мечты
                        с FillSwift
                    </h2>
                    <h3 className={styles["fill-subheader"]}>
                        Ваш путь к идеальной заправке. Откройте для себя топливо, созданное специально для вас!
                    </h3>
                    <div className={styles.btns}>
                        <button className={styles["btn-shop"]}>Магазин</button>
                        <button className={styles["btn-fill"]}>Заправиться</button>
                    </div>
                    <div className={styles.blocks}>
                        <div className={styles["mobile-blocks"]}>
                            <article className={styles.block}>
                                <p className={styles["header-text"]}>200+</p>
                                <span className={styles.text}>Клиентов</span>
                            </article>
                            <article className={styles.block}>
                                <p className={styles["header-text"]}>10k+</p>
                                <span className={styles.text}>Залито топлива</span>
                            </article>
                        </div>
                        <article className={styles.block}>
                            <p className={styles["header-text"]}>16+</p>
                            <span className={styles.text}>Годы опыта</span>
                        </article>
                    </div>
                </div>
                <div className={styles["content-right"]}>
                    <img className={styles.img} src="/home-img.png" alt=""/>
                </div>
            </div>
        </div>
    </section>
);

export default Home;