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

        const shouldDisplayHeader = () => {
                return location.pathname.startsWith(ROUTES.ProductDetails) ||
                    [
                            ROUTES.Shop,
                            ROUTES.Contact,
                            ROUTES.Fueling,
                            ROUTES.TypeFuels,
                            ROUTES.Home
                    ].includes(location.pathname);
        };

        return (
            <div className={styles['dashboard-container']}>
                    {shouldDisplaySidebar() && <Sidebar />}
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
                            </Routes>
                    </div>
            </div>
        );
}

export default AppRoutes;
