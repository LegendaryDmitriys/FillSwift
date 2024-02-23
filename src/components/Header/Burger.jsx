import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import sprite from "../../sprite.svg";
import "../../styles/burger.css"


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
            <a id="home" className="menu-item" href="/">
                Главная
            </a>
            <a id="fueling" className="menu-item" href="/fueling">
                Заправиться
            </a>
            <a id="shop" className="menu-item" href="/shop">
                Магазин
            </a>
            <a id="fuel" className="menu-item" href="/fuel">
                Типы топлива
            </a>
            <a id="contact" className="menu-item" href="/contact">
                Контакты
            </a>
        </Menu>
    );
};

export default BurgerMenu;
