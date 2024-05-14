import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import {isAuthenticated, isStaff} from "../utils/authUsers";

const AdminRoute = () => {
    return isAuthenticated() && isStaff() ? <Outlet /> : <Navigate to={ROUTES.Home} />;
};

export default AdminRoute;