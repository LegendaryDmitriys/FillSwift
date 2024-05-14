import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from "../../../utils/formateDate";
import { API } from "../../../utils/APi";


const Stats = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(5);
    const [year] = useState(2024);

    useEffect(() => {
        axios.get(`${API}/stats/?month=${selectedMonth}&year=${year}`)
            .then(response => {
                const purchases = response.data.purchases.map(entry => ({ ...entry, category: 'Покупка' }));
                const refuelings = response.data.refuelings.map(entry => ({ ...entry, category: 'Заправка' }));
                setCombinedData([...purchases, ...refuelings]);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, [selectedMonth, year]);

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

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
        container: { marginTop: '50px' },
        select: {
            backgroundColor: '#000',
            color: '#fff',
            padding: '8px 12px',
            border: '1px solid #000',
            borderRadius: '4px',
            fontSize: '16px'
        },
        option: {
            backgroundColor: '#000',
            color: '#fff'
        }
    };
    return (
        <div style={styles.container}>
            <div>
                <label htmlFor="month">Выберите месяц: </label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange} style={styles.select}>
                    <option value={1}>Январь</option>
                    <option value={2}>Февраль</option>
                    <option value={3}>Март</option>
                    <option value={4}>Апрель</option>
                    <option value={5}>Май</option>
                    <option value={6}>Июнь</option>
                    <option value={7}>Июль</option>
                    <option value={8}>Август</option>
                    <option value={9}>Сентябрь</option>
                    <option value={10}>Октябрь</option>
                    <option value={11}>Ноябрь</option>
                    <option value={12}>Декабрь</option>
                </select>
            </div>
            <ResponsiveContainer width={700} height={300}>
                <LineChart data={combinedData}>
                    <XAxis hide={true} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" dot={{ stroke: '#8884d8', fill: '#fff', r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Stats;
