import React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from "../utils/routes";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Auth from "../components/Authentication/Auth.jsx";
import Registration from "../components/Authentication/Registration.jsx";
import Shop from "../components/Shop/Shop.jsx";
import ProductDetails from "../components/Details/productDetails.jsx";
import DashboardHistoryFuels from "../components/Dashboard/DashboardHistoryFuels.jsx";
import DashboardCars from "../components/Dashboard/DashboardCars.jsx";
import DashboardBasket from "../components/Dashboard/DashboardBasket.jsx";
import DashboardSettings from "../components/Dashboard/DashboardSettings.jsx";
import TypeFuels from "../components/TypeFuels/typeFuels.jsx";
import Contacts from "../components/Contacts/Contacts.jsx";
import Fuelings from "../components/Fuelings/Fuelings.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Header from "../components/Header/Header.jsx";
import ResetPassword from "../components/Authentication/ResetPassword.jsx";
import AdminAuth from "../components/Authentication/Admin/AdminAuth.jsx";
import Customers from "../components/Dashboard/Admin/Customers.jsx";
import AdminSidebar from "../components/Dashboard/Admin/AdminSidebar.jsx";
import CustomersDetail from "../components/Details/Admin/CustomersDetail.jsx";
import Сars from "../components/Dashboard/Admin/Сars.jsx";
import CarsDetail from "../components/Details/Admin/CarsDetail.jsx";
import Products from "../components/Dashboard/Admin/Products.jsx";
import AdminProductsDetail from "../components/Details/Admin/AdminProductsDetail.jsx";
import AdminRequests from "../components/Dashboard/Admin/AdminRequests.jsx";
import AdminFuelStation from "../components/Dashboard/Admin/AdminFuelStation.jsx";
import FuelStationDetail from "../components/Details/Admin/FuelStationDetail.jsx";
import AdminFuelType from "../components/Dashboard/Admin/AdminFuelType.jsx";
import AdminDashboard from "../components/Dashboard/Admin/AdminDashboard.jsx";
import styles from "../styles/dashboardcontainer.module.css"
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Operators from "../components/Dashboard/Admin/Operators";
import OperatorRequests from "../components/Dashboard/Operator/OperatorRequests";
import OperatorSidebar from "../components/Dashboard/Operator/OperatorSidebar";
import OperatorCars from "../components/Dashboard/Operator/OperatorCars";
import OperatorProducts from "../components/Dashboard/Operator/OperatorProducts";
import OperatorTypeFuels from "../components/Dashboard/Operator/OperatorTypeFuels";
import OperatorFuelStation from "../components/Dashboard/Operator/OperatorFuelStation";
import OperatorFuelStationDetail from "../components/Details/Operator/OperatorFuelStationDetail";
import OperatorRoute from "./OperatorRoute";

const AppRoutes = () => {
    const location = useLocation();

    const shouldDisplaySidebar = () => {
        return [
            ROUTES.HistoryFuels,
            ROUTES.Cars,
            ROUTES.Basket,
            ROUTES.Settings,

        ].includes(location.pathname);
    };

    const shouldAdminDisplaySidebar = () => {
        return [
            ROUTES.CustomersDashboard,
            ROUTES.CarsDashboard,
            ROUTES.ProductsDashboard,
            ROUTES.AdminRequests,
            ROUTES.AdminFuelStation,
            ROUTES.AdminFuelType,
            ROUTES.AdminDashboard,
            ROUTES.OperatorsDashboard
        ].includes(location.pathname);
    };

    const shouldOperatorDisplaySidebar = () => {
        return [
            ROUTES.OperatorRequests,
            ROUTES.OperatorCars,
            ROUTES.OperatorProducts,
            ROUTES.OperatorTypeFuels,
            ROUTES.OperatorFuelStation
        ].includes(location.pathname);
    };

    const shouldDisplayHeader = () => {
        return location.pathname.startsWith(ROUTES.ProductDetails) ||
            [
                ROUTES.Shop,
                ROUTES.Contact,
                ROUTES.Fueling,
                ROUTES.TypeFuels,
                ROUTES.Home,
            ].includes(location.pathname);
    };

    return (
        <div className={styles['dashboard-container']}>
            {shouldDisplaySidebar() && <Sidebar/>}
            {shouldAdminDisplaySidebar() && <AdminSidebar/>}
            {shouldOperatorDisplaySidebar() && <OperatorSidebar/>}
            <div className={styles.content}>
                {shouldDisplayHeader() && <Header/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={ROUTES.Login} element={<Auth/>}/>
                    <Route path={ROUTES.Registration} element={<Registration/>}/>
                    <Route path={ROUTES.TypeFuels} element={<TypeFuels/>}/>
                    <Route path={ROUTES.Contact} element={<Contacts/>}/>
                    <Route path={ROUTES.Fueling} element={<Fuelings/>}/>
                    <Route path={ROUTES.Shop} element={<Shop/>}/>
                    <Route path={`${ROUTES.ProductDetails}/:productId`} element={<ProductDetails/>}/>
                    <Route path={ROUTES.ResetPassword} element={<ResetPassword/>}/>
                    <Route path={ROUTES.AdminLogin} element={<AdminAuth/>}/>
                    <Route element={<PrivateRoute />}>
                        <Route path={ROUTES.HistoryFuels} element={<DashboardHistoryFuels/>}/>
                        <Route path={ROUTES.Cars} element={<DashboardCars/>}/>
                        <Route path={ROUTES.Basket} element={<DashboardBasket/>}/>
                        <Route path={ROUTES.Settings} element={<DashboardSettings/>}/>
                    </Route>
                    <Route element={<AdminRoute />}>
                        <Route path={ROUTES.CustomersDashboard} element={<Customers/>}/>
                        <Route path={`${ROUTES.CustomersDetails}/:userId`} element={<CustomersDetail/>}/>
                        <Route path={ROUTES.CarsDashboard} element={<Сars/>}/>
                        <Route path={`${ROUTES.CarsDetails}/:carId`} element={<CarsDetail/>}/>
                        <Route path={ROUTES.ProductsDashboard} element={<Products/>}/>
                        <Route path={`${ROUTES.AdminProductsDetails}/:productId`} element={<AdminProductsDetail/>}/>
                        <Route path={ROUTES.AdminRequests} element={<AdminRequests/>}/>
                        <Route path={ROUTES.AdminFuelStation} element={<AdminFuelStation/>}/>
                        <Route path={`${ROUTES.AdminFuelStationDetail}/:fuelStationId`} element={<FuelStationDetail/>}/>
                        <Route path={ROUTES.AdminFuelType} element={<AdminFuelType/>}/>
                        <Route path={ROUTES.AdminDashboard} element={<AdminDashboard/>}/>
                        <Route path={ROUTES.OperatorsDashboard} element={<Operators/>}/>
                    </Route>
                    <Route element={<OperatorRoute />}>
                        <Route path={ROUTES.OperatorRequests} element={<OperatorRequests/>}/>
                        <Route path={ROUTES.OperatorCars} element={<OperatorCars/>}/>
                        <Route path={ROUTES.OperatorProducts} element={<OperatorProducts/>}/>
                        <Route path={ROUTES.OperatorTypeFuels} element={<OperatorTypeFuels/>}/>
                        <Route path={ROUTES.OperatorFuelStation} element={<OperatorFuelStation/>}/>
                        <Route path={`${ROUTES.OperatorFuelStationDetail}/:fuelStationId`} element={<OperatorFuelStationDetail/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default AppRoutes;