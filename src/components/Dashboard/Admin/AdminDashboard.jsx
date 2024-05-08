import React from 'react';
import Stats from "./Stats";


import styles from "../../../styles/admindashboard.module.css"
import AvgFuelQuantityChart from "../Charts/AvgFuelQuantityChart";
import CarStatsChart from "../Charts/CarStatsChart";

function AdminDashboard(props) {
    return (
        <div className={styles.container}>
            <Stats/>
            <AvgFuelQuantityChart/>
            <CarStatsChart/>
        </div>
    );
}

export default AdminDashboard;