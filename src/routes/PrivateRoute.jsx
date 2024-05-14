
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import {isAuthenticated} from "../utils/authUsers";

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.Login} />;
};

export default PrivateRoute;
