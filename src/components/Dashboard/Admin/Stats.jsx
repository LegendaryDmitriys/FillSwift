import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {formatDate} from "../../../utils/formateDate";
import {API} from "../../../utils/APi";

const Stats = () => {
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        axios.get(`${API}/stats/?month=5&year=2024`)
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
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px', border: '1px solid black' }}>
                    <p style={{ color: '#fff' }}>{formatDate(data.day)}</p>
                    <p style={{ color: '#fff' }}>{data.category}: {data.count}</p>
                </div>
            );
        }
        return null;
    };

    const styles = {
        marginTop: '50px'
    };

    return (
        <div style={styles}>
            <ResponsiveContainer width={700} height={300}>
                <LineChart data={combinedData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" dot={{ stroke: '#8884d8', fill: '#fff', r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
