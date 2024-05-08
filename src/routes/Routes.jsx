import React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from "../utils/routes";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Auth from "../components/Authentication/Auth";
import Registration from "../components/Authentication/Registration";
import Shop from "../components/Shop/Shop";
import ProductDetails from "../components/Details/productDetails";
import DashboardHistoryFuels from "../components/Dashboard/DashboardHistoryFuels";
import DashboardCars from "../components/Dashboard/DashboardCars";
import DashboardBasket from "../components/Dashboard/DashboardBasket";
import DashboardSettings from "../components/Dashboard/DashboardSettings";
import TypeFuels from "../components/TypeFuels/typeFuels";
import Contacts from "../components/Contacts/Contacts";
import Fuelings from "../components/Fuelings/Fuelings";
import Sidebar from "../components/Dashboard/Sidebar";
import styles from "../styles/dashboardcontainer.module.css"
import Header from "../components/Header/Header";
import ResetPassword from "../components/Authentication/ResetPassword";
import AdminAuth from "../components/Authentication/Admin/AdminAuth";
import Customers from "../components/Dashboard/Admin/Customers";
import AdminSidebar from "../components/Dashboard/Admin/AdminSidebar";
import CustomersDetail from "../components/Details/Admin/CustomersDetail";
import Сars from "../components/Dashboard/Admin/Сars";
import CarsDetail from "../components/Details/Admin/CarsDetail";
import Products from "../components/Dashboard/Admin/Products";
import AdminProductsDetail from "../components/Details/Admin/AdminProductsDetail";
import AdminRefuelingRequests from "../components/Dashboard/Admin/AdminRefuelingRequests";
import AdminRequests from "../components/Dashboard/Admin/AdminRequests";
import AdminFuelStation from "../components/Dashboard/Admin/AdminFuelStation";
import FuelStationDetail from "../components/Details/Admin/FuelStationDetail";
import AdminFuelType from "../components/Dashboard/Admin/AdminFuelType";
import AdminDashboard from "../components/Dashboard/Admin/AdminDashboard";

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
            ROUTES.AdminDashboard
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
                            ROUTES.CustomersDetails
                    ].includes(location.pathname);
        };

        return (
            <div className={styles['dashboard-container']}>
                    {shouldDisplaySidebar() && <Sidebar />}
                    {shouldAdminDisplaySidebar()  && <AdminSidebar/>}
                    <div className={styles.content}>
                            {shouldDisplayHeader() && <Header />}
                            <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path={ROUTES.Login} element={<Auth />} />
                                    <Route path={ROUTES.Registration} element={<Registration />} />
                                    <Route path={ROUTES.HistoryFuels} element={<DashboardHistoryFuels />} />
                                    <Route path={ROUTES.Cars} element={<DashboardCars />} />
                                    <Route path={ROUTES.Basket} element={<DashboardBasket />} />
                                    <Route path={ROUTES.Settings} element={<DashboardSettings />} />
                                    <Route path={ROUTES.TypeFuels} element={<TypeFuels />} />
                                    <Route path={ROUTES.Contact} element={<Contacts />} />
                                    <Route path={ROUTES.Fueling} element={<Fuelings />} />
                                    <Route path={ROUTES.Shop} element={<Shop />} />
                                    <Route path={`${ROUTES.ProductDetails}/:productId`} element={<ProductDetails />} />
                                    <Route path={ROUTES.ResetPassword} element={<ResetPassword/>} />
                                    <Route path={ROUTES.AdminLogin} element={<AdminAuth/>} />
                                    <Route path={ROUTES.CustomersDashboard} element={<Customers/>} />
                                    <Route path={`${ROUTES.CustomersDetails}/:userId`} element={<CustomersDetail/>} />
                                    <Route path={ROUTES.CarsDashboard} element={<Сars/>} />
                                    <Route path={`${ROUTES.CarsDetails}/:carId`} element={<CarsDetail/>}/>
                                    <Route path={ROUTES.ProductsDashboard} element={<Products/>} />
                                    <Route path={`${ROUTES.AdminProductsDetails}/:productId`} element={<AdminProductsDetail/>} />
                                    <Route path={ROUTES.AdminRequests} element={<AdminRequests/>} />
                                    <Route path={ROUTES.AdminFuelStation} element={<AdminFuelStation/>} />
                                    <Route path={`${ROUTES.AdminFuelStationDetail}/:fuelStationId`} element={<FuelStationDetail/>}/>
                                    <Route path={ROUTES.AdminFuelType} element={<AdminFuelType/>} />
                                    <Route path={ROUTES.AdminDashboard} element={<AdminDashboard/>} />
                            </Routes>
                    </div>
            </div>
        );
}

export default AppRoutes;
