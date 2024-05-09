import React, {useEffect, useState} from 'react';

import styles from "../../../styles/admindashboard.module.css"

import Stats from "./Stats.jsx";
import AvgFuelQuantityChart from "../Charts/AvgFuelQuantityChart.jsx";
import CarStatsChart from "../Charts/CarStatsChart.jsx";
import TotalProductsSoldChart from "../Charts/TotalProductsSoldChart";
import TotalFuelRefueledChart from "../Charts/TotalFuelRefueledChart";
import axios from "axios";


function AdminDashboard(props) {
    const [popularProducts, setPopularProducts] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const popularProductsResponse = await axios.get('http://192.168.0.106:8000/products/popular-products/');
                const totalSpentResponse = await axios.get('http://192.168.0.106:8000/statistic/total-spent-stats/');

                setPopularProducts(popularProductsResponse.data);
                setTotalSpent(totalSpentResponse.data.total_spent);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, []);


    console.log(popularProducts)

    return (
        <div className={styles.container}>
            <div className={styles["left-content"]}>
                <h2 className={styles.title}>Статистика</h2>
                <div className={styles["profit-block"]}>
                    <div className={styles["profit-img"]}>
                        <img src="../../images/profit.png" alt=""/>
                    </div>
                    <div className={styles["profit-text"]}>
                        <p>Выгода</p>
                        <span>{totalSpent} ₽</span>
                    </div>
                </div>
                <div className={styles["salescharts-block"]}>
                    <h3 className={styles.subtitle}>Cтатистика покупок и продаж за месяц</h3>

                    <Stats/>
                </div>
            </div>
            <div className={styles["right-content"]}>
                <h3 className={styles.subtitle}>Самые продаваемые продукты</h3>
                <div className={styles['popular-products']}>
                    <table>
                        <tbody>
                        {popularProducts
                            .slice(0, 5)
                            .map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            className={styles["product-img"]}
                                            src={
                                                product.images.length > 0
                                                    ? product.images[0].image
                                                    : '../images/defaultProduct.png'
                                            }
                                            alt="productImage"
                                        />
                                    </td>
                                    <td>
                                        <article className={styles["name-product"]}>
                                            <p>{product.name}</p>
                                            <span>{product.product_type}</span>
                                        </article>
                                    </td>
                                    <td>
                                        <article className={styles["sales-product"]}>
                                            <span>{product.total_sales}</span>
                                            <p>Куплено раз</p>
                                        </article>
                                    </td>
                                    <td className={styles['sales-number']}>#{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles['carschart-block']}>
                        <h3 className={styles.subtitle}>Популярные бренды автомобилей</h3>
                        <CarStatsChart/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;