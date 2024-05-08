import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CarStatsChart = () => {
    const [carStats, setCarStats] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.106:8000/statistic/car-brand-model-stats/')
            .then(response => {
                setCarStats(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f', '#ff5e00', '#ff3838'];


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{ backgroundColor: 'black', padding: '10px', border: '1px solid black' }}>
                    <p>{carStats.brand_model}</p>
                    <p></p>
                </div>
            );
        }
        return null;
    };


    return (
        <div>
            <h2>Статистика по маркам и моделям автомобилей</h2>
            <ResponsiveContainer width={500} height={300}>
                <PieChart>
                    <Pie dataKey="count" nameKey="brand__name" data={carStats} label fill="#8884d8" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CarStatsChart;
