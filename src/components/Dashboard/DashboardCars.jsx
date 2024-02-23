import React from 'react';
import Sidebar from "./Sidebar";
import HeaderBoard from "./HeaderBoard";


import styles from "../../styles/dashboardcars.module.css";
import sprite from "../../sprite.svg";

function DashboardCars(props) {
    return (
        <div className={styles.dashboard}>
            <div>
                <Sidebar/>
            </div>
            <div className={styles["main-content"]}>
                <HeaderBoard title={"Мое авто"} description={"Здесь отображаются все ваши автомобили "}/>
                <div className={styles["cars"]}>
                    <div className={styles["interaction-buttons"]}>
                        <form action="">
                            <div className={styles["form-input"]}>
                                <svg width={24} height={24}>
                                    <use xlinkHref={sprite + "#glass"}/>
                                </svg>
                                <input type="text" placeholder="Поиск"/>
                            </div>
                        </form>
                        <button>
                            <svg width={24} height={24}>
                                <use xlinkHref={sprite + "#plus2"}/>
                            </svg>
                            Добавить авто
                        </button>
                    </div>
                    <div className={styles["cars-cards"]}>
                        <div className={styles["cars-card"]}>
                            <img src="https://ltdfoto.ru/images/2024/02/18/car.png" alt="Car"/>
                            <h2>Mercedes-Benz</h2>
                            <h3>W221</h3>
                            <p>Номер автомобиля</p>
                            <span>А201АW 53</span>
                        </div>
                        <div className={styles["cars-card"]}>
                            <img src="https://ltdfoto.ru/images/2024/02/18/car.png" alt="Car"/>
                            <h2>Mercedes-Benz</h2>
                            <h3>W221</h3>
                            <p>Номер автомобиля</p>
                            <span>А201АW 53</span>
                        </div>
                        <div className={styles["cars-card"]}>
                            <img src="https://ltdfoto.ru/images/2024/02/18/car.png" alt="Car"/>
                            <h2>Mercedes-Benz</h2>
                            <h3>W221</h3>
                            <p>Номер автомобиля</p>
                            <span>А201АW 53</span>
                        </div>
                        <div className={styles["cars-card"]}>
                            <img src="https://ltdfoto.ru/images/2024/02/18/car.png" alt="Car"/>
                            <h2>Mercedes-Benz</h2>
                            <h3>W221</h3>
                            <p>Номер автомобиля</p>
                            <span>А201АW 53</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCars;