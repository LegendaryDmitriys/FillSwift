import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TotalProductsSoldChart = () => {
    const [totalProductsSoldData, setTotalProductsSoldData] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.106:8000/statistic/total-products-sold/')
            .then(response => {
                const data = response.data;
                setTotalProductsSoldData([{ name: 'Total Products Sold', totalProductsSold: data.total_products_sold }]);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <div>
            <h2>График общего количества проданных товаров</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={totalProductsSoldData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalProductsSold" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalProductsSoldChart;
