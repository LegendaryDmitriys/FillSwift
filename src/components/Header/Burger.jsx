import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import sprite from "../../sprite.svg";
import "../../styles/burger.css"
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";
import {isAuthenticated} from "../../utils/authUsers";


const BurgerMenu = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isAuthenticated()) {
            navigate(ROUTES.Settings);
        } else {
            navigate(ROUTES.Login);
        }
    };
    return (
        <Menu
            noOverlay
            right
            customBurgerIcon={<svg className='icon' width={30} height={30}>
                <use xlinkHref={sprite + "#burger"}/>
            </svg>}
        >
            <svg className='icon' width={134} height={51} id="logo">
                <use xlinkHref={sprite + "#logo"}/>
            </svg>
            <h3 id="subheader">Ваш путь к идеальной заправке.</h3>
            <Link id="home" className="menu-item" to={ROUTES.Home}>
                Главная
            </Link>
            <Link id="fueling" className="menu-item" to={ROUTES.Fueling}>
                Заправиться
            </Link>
            <Link id="shop" className="menu-item" to={ROUTES.Shop}>
                Магазин
            </Link>
            <Link id="fuel" className="menu-item" to={ROUTES.TypeFuels}>
                Типы топлива
            </Link>
            <Link id="contact" className="menu-item" to={ROUTES.Contact}>
                Контакты
            </Link>
            <button id="profile" className="menu-item" onClick={handleProfileClick}>
                Профиль
            </button>
        </Menu>
    );
};

export default BurgerMenu;
