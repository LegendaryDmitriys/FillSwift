import React from 'react';
import styles from "../../styles/contact.module.css";
import sprite from "../../sprite.svg";

function BlockSocial(props) {
    return (
        <div className={styles["social-container"]}>
            <div className={styles["social-item"]}>
                <a href="mailto:info@fillswift.ru">
                    <div>
                        <svg className={styles["contacts-arrow"]} width={32} height={32}>
                            <use xlinkHref={sprite + "#social-arrow"}/>
                        </svg>
                    </div>
                    <svg className={styles["contacts-ico"]} width={83} height={83}>
                        <use xlinkHref={sprite + "#mail"}/>
                    </svg>
                    <p>info@fillswift.ru</p>
                </a>
            </div>
            <div className={styles["social-item"]}>
                <a href="tel:+79999999999">
                    <div>
                        <svg className={styles["contacts-arrow"]} width={32} height={32}>
                            <use xlinkHref={sprite + "#social-arrow"}/>
                        </svg>
                    </div>
                    <svg className={styles["contacts-ico"]} width={83} height={83}>
                        <use xlinkHref={sprite + "#tel"}/>
                    </svg>
                    <p>+7 (999) 999-999</p>
                </a>
            </div>
            <div className={styles["social-item"]}>
                <a href="https://yandex.ru/maps/-/CDFmAP0H">
                    <div>
                        <svg className={styles["contacts-arrow"]} width={32} height={32}>
                            <use xlinkHref={sprite + "#social-arrow"}/>
                        </svg>
                    </div>
                    <svg className={styles["contacts-ico"]} width={83} height={83}>
                        <use xlinkHref={sprite + "#geo"}/>
                    </svg>
                    <p>Мы находимся</p>
                </a>
            </div>
            <div className={styles["social-item"]}>
                <a href="https://telegram.org/" target="_blank">
                    <div>
                        <svg className={styles["contacts-arrow"]} width={32} height={32}>
                            <use xlinkHref={sprite + "#social-arrow"}/>
                        </svg>
                    </div>
                    <svg className={styles["contacts-ico"]} width={83} height={83}>
                        <use xlinkHref={sprite + "#social"}/>
                    </svg>
                    <article>
                        <p>Мы в Telegram</p>
                    </article>
                </a>
            </div>
        </div>
    );
}

export default BlockSocial;