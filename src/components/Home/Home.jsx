import React from 'react';


import styles from "../../styles/home.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";


const Home = (props) => (
    <section className={styles.home}>
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
                        <Link to={ROUTES.Shop}><button className={styles["btn-shop"]}>Магазин</button></Link>
                        <Link to={ROUTES.Fueling}><button className={styles["btn-fill"]}>Заправиться</button></Link>
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
                    <img className={styles.img} src="https://cdn3d.iconscout.com/3d/premium/thumb/gas-station-6843928-5603514.png?f=webp" alt=""/>
                </div>
            </div>
        </div>
    </section>
);

export default Home;