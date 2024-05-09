import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TotalFuelRefueledChart = () => {
    const [fuelRefueledData, setFuelRefueledData] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.106:8000/statistic/total-fuel-refueled-stats/')
            .then(response => {
                setFuelRefueledData(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <div>
            <h2>Общее количество заправленного топлива по месяцам и годам</h2>
            <ResponsiveContainer width={500} height={300}>
                <PieChart>
                    <Pie dataKey="total_fuel_refueled" nameKey="month_year" data={fuelRefueledData} label fill="#8884d8" />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalFuelRefueledChart;
