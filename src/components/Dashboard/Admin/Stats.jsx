import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';

const Stats = () => {
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        // Получение данных с бэкенда
        axios.get('http://192.168.0.106:8000/stats/?month=5&year=2024')
            .then(response => {
                const purchases = response.data.purchases.map(entry => ({ ...entry, category: 'Покупка' }));
                const refuelings = response.data.refuelings.map(entry => ({ ...entry, category: 'Заправка' }));
                setCombinedData([...purchases, ...refuelings]);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{ backgroundColor: 'black', padding: '10px', border: '1px solid black' }}>
                    <p>{data.day}</p>
                    <p>{data.category}</p>
                    <p>{data.count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <h2>Статистика</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={combinedData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="rgb(75, 192, 192)" dot={{ stroke: 'rgb(75, 192, 192)', fill: 'white', strokeWidth: 2 }} />
                    <Scatter dataKey="category" fill="rgb(75, 192, 192)" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
