import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import {isAuthenticated, isOperator, isStaff,} from "../utils/authUsers";

const OperatorRoute = () => {
    return (isAuthenticated() && (isOperator() || isStaff())) ? <Outlet /> : <Navigate to={ROUTES.Home} />;
};

export default OperatorRoute;