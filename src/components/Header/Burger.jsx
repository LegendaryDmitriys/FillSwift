import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import sprite from "../../sprite.svg";
import "../../styles/burger.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes.js";


const BurgerMenu = () => {
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
            <Link id="fueling" className="menu-item" to="">
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
            <Link id="profile" className="menu-item" to={ROUTES.Settings}>
                Профиль
            </Link>
        </Menu>
    );
};

export default BurgerMenu;
