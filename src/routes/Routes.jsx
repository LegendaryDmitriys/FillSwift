import React from 'react';
import { Route, Routes } from "react-router-dom";
import {ROUTES} from "../utils/routes";
import Home from "../components/Home/Home";
import Auth from "../components/Authentication/Auth";
import Registration from "../components/Authentication/Registration";
import Shop from "../components/Shop/Shop";
import ProductDetails from "../components/Details/productDetails";
import DashboardHistoryFuels from "../components/Dashboard/DashboardHistoryFuels";
import DashboardCars from "../components/Dashboard/DashboardCars";
import DashboardBasket from "../components/Dashboard/DashboardBasket";
import DashboardSettings from "../components/Dashboard/DashboardSettings";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path={ROUTES.Login} element={<Auth/>}/>
        <Route path={ROUTES.Registration} element={<Registration/>}/>
        <Route path={ROUTES.Shop} element={<Shop/>}/>
        <Route path={ROUTES.ProductDetails} element={<ProductDetails/>}/>
        <Route path={ROUTES.HistoryFuels} element={<DashboardHistoryFuels/>}/>
        <Route path={ROUTES.Cars} element={<DashboardCars/>}/>
        <Route path={ROUTES.Basket} element={<DashboardBasket/>}/>
        <Route path={ROUTES.Settings} element={<DashboardSettings/>}/>
    </Routes>
)


export default AppRoutes;