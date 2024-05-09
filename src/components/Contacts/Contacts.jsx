import React from 'react';

import styles from "../../styles/contact.module.css"
import sprite from "../../sprite.svg";
import {Map, YMaps, Placemark} from "@pbe/react-yandex-maps";
import BlockSocial from "./BlockSocial.jsx";


function Contacts(props) {
    const Headquarters = [58.543946, 31.244149];

    const imagesPlacemark = {
        iconLayout: 'default#image',
        iconImageHref: '../images/placemark.png',
        iconImageSize: [45, 45],
        iconImageOffset: [-15, -30]
    };

    return (
        <div>
            <div className={styles.contacts}>
                <div className={styles["contacts-header__info"]}>
                    <h2>Свяжитесь с FillSwift</h2>
                    <p>Добро пожаловать на страницу контактов FillSwift. Мы здесь, чтобы помочь вам с любыми вопросами, запросами или отзывами, которые могут у вас возникнуть. Свяжитесь с нами, и давайте начнем разговор.</p>
                </div>
                <BlockSocial/>
                <div className={styles["our-location"]}>
                    <div className={styles["our-location__header"]}>
                        <svg width={69} height={30}>
                            <use xlinkHref={sprite + "#stars"}/>
                        </svg>
                        <h2>Мы находимся</h2>
                        <p>FillSwift здесь, чтобы обслуживать вас в разных местах. Если вы хотите встретиться с нашей
                            командой, обсудить возможности cотружества или просто зайти поболтать, у нас есть офис,
                            удобно расположенный для удовлетворения ваших потребностей. Изучите категории ниже, чтобы
                            найти офис FillSwift.</p>
                    </div>
                    <div className={styles["our-location__main"]}>
                        <div className={styles["our-location__map"]}>
                            <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY }}>
                                <div>
                                    <Map
                                        defaultState={{ center: [58.536413, 31.259857], zoom: 12 }}
                                        width="50vw"
                                        height="70vh"
                                    >
                                        <Placemark geometry={Headquarters} options={imagesPlacemark}/>
                                    </Map>
                                </div>
                            </YMaps>
                        </div>
                        <div className={styles["our-location__info"]}>
                            <article>
                                <span>Главный штаб</span>
                                <h3>23,проспект Александра Корсунова</h3>
                                <p>Наша главная штаб-квартира . расположенная в оживленном центре города, именно здесь работает наша основная команда экспертов, стремящаяся к совершенству и инновациям, которые нас определяют.</p>
                            </article>
                            <div className={styles["connection-container"]}>
                                <button>
                                    <svg className={styles["connection-ico"]} width={24} height={24}>
                                        <use xlinkHref={sprite + "#mail-btn"}/>
                                    </svg>
                                    <a href="mailto:info@fillswift.ru">info@fillswift.ru</a>
                                </button>
                                <button>
                                <svg className={styles["connection-ico"]} width={24} height={24}>
                                        <use xlinkHref={sprite + "#phone-btn"}/>
                                    </svg>
                                    <a href="tel:+79999999999">+7 (999) 999-999</a>
                                </button>
                            </div>
                            <div className={styles["redirection"]}>
                                <button>
                                    <a href="https://yandex.ru/maps/24/veliky-novgorod/?indoorLevel=1&ll=31.244554%2C58.543980&mode=routes&rtext=~58.543946%2C31.244149&rtt=auto&ruri=~&z=17.12" target="_blank">Получить направление</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;