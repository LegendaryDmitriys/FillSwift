import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AverageFuelQuantityChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.106:8000/statistic/avg-fuel-quantity/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    console.log(data)

    return (
        <div>
            <h2>Среднее количество топлива, заправленного за одну заправку</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average_fuel_quantity" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AverageFuelQuantityChart;
