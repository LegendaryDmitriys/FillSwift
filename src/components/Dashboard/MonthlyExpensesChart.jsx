import { Bar } from 'react-chartjs-2';

function MonthlyExpensesChart() {
    const data = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        datasets: [
            {
                label: 'Потрачено Рублей',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [10000, 12000, 8000, 15000, 9000, 11000, 13000, 10000, 14000, 9000, 12000, 11000]
            }
        ]
    };

    return (
        <div>
            <Bar
                data={data}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Месяцы'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Потрачено Рублей'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }}
            />
        </div>
    );
}

export default MonthlyExpensesChart;
