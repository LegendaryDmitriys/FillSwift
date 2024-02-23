import React, { useState } from 'react';
import styles from "../../styles/detailsproduct.module.css"
import sprite from "../../sprite.svg";
import Header from "../Header/Header";

const ProductDetails = (props) => {
    const imagePath = "../../images/";

    const [activeIndex, setActiveIndex] = useState(0);
    const handleSlideLeft = () => {
        const newIndex = (activeIndex - 1 + 4) % 4;
        setActiveIndex(newIndex);
    };

    const handleSlideRight = () => {
        const newIndex = (activeIndex + 1) % 4;
        setActiveIndex(newIndex);
    };

    return (
        <section>
            <Header/>
            <section className={styles["details-container"]}>
                <div className={styles["details-header"]}>
                    <div className={styles["header-container"]}>
                        <div className={styles["name-product-container"]}>
                            <h1>Масло <span>SintecS</span></h1>
                        </div>
                        <div className={styles["price-container"]}>
                            <article>
                                <h3>Cтоимость</h3>
                                <p>600 P</p>
                            </article>
                        </div>
                    </div>
                </div>
                <div className={styles["details-base"]}>
                    <div className={styles["details-products__slide"]}>
                        <div className={styles["img-container__top"]}>
                            {[1, 2, 3, 4].map((index) => (
                                <img
                                    key={index}
                                    src={`${imagePath}${index}.jpeg`}
                                    alt={`img#${index}`}
                                    className={activeIndex === index - 1 ? styles.active : ""}
                                />
                            ))}
                        </div>
                        <div className={styles["img-container__base"]}>
                            <img
                                src={`${imagePath}${activeIndex + 1}.jpeg`}
                                alt={`img#base`}
                            />
                        </div>
                        <div className={styles["button-container__down"]}>
                            <button onClick={handleSlideLeft}>
                                <svg width={58} height={58}>
                                    <use xlinkHref={sprite + "#slide-left"}/>
                                </svg>
                            </button>
                            <div className={styles["indicators-container"]}>
                                {[0, 1, 2, 3].map((index) => (
                                    <div
                                        key={index}
                                        className={index === activeIndex ? styles["indicator-activ"] : styles.indicator}
                                    />
                                ))}
                            </div>
                            <button onClick={handleSlideRight}>
                                <svg width={58} height={58}>
                                    <use xlinkHref={sprite + "#slide-right"}/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles["details-info"]}>
                        <article className={styles["info-text"]}>
                            <h2>Описание</h2>
                            <p>Масло для двигателя - надежный союз вашего автомобиля с долговечностью и эффективностью. Наше
                                высококачественное масло создано, чтобы обеспечивать оптимальную смазку и защиту двигателя в
                                самых экстремальных условиях</p>
                        </article>
                        <button>Купить</button>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default ProductDetails;
