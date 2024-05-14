import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename="/">
            <ToastContainer theme="dark" />
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
