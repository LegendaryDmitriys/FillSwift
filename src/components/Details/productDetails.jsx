import React, { useEffect, useState } from 'react';
import styles from "../../styles/detailsproduct.module.css"
import sprite from "../../sprite.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "../../utils/authUsers";

const ProductDetails = (props) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mainImage, setMainImage] = useState(0);

    const handleSlideLeft = () => {
        const newIndex = (activeIndex - 1 + product.images.length) % product.images.length;
        setActiveIndex(newIndex);
        setMainImage(newIndex);
    };

    const handleSlideRight = () => {
        const newIndex = (activeIndex + 1) % product.images.length;
        setActiveIndex(newIndex);
        setMainImage(newIndex);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/products/products/${productId}`)
            .then(response => {
                setProduct(response.data);
                setTotalPrice(response.data.price_per_unit * quantity);
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продукте:', error);
            });
    }, [productId, quantity]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(product.price_per_unit * (quantity - 1));
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice(product.price_per_unit * (quantity + 1));
    };

    const handleBuyProduct = async () => {
        if (isAuthenticated()) {
            try {
                const userResponse = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                const userId = userResponse.data.user.id;
                const basketResponse = await axios.get(`http://localhost:8000/carts/baskets/${userId}/`);
                const basketId = basketResponse.data.id;

                const productResponse = await axios.post(
                    'http://localhost:8000/carts/basket-products/',
                    {
                        basket: basketId,
                        product: parseInt(productId),
                        quantity: quantity,
                    },
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        }
                    }
                );

                console.log('Продукт успешно добавлен в корзину:', productResponse.data);
            } catch (error) {
                console.error('Ошибка при выполнении запросов:', error);
            }
        } else {
            console.log('Пользователь не авторизован.');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const maxIndicators = Math.min(4, product.images.length);

    return (
        <section>
            <section className={styles["details-container"]}>
                <div className={styles["details-header"]}>
                    <div className={styles["header-container"]}>
                        <div className={styles["name-product-container"]}>
                            <h1>{product.name} <span>{product.manufacturer}</span></h1>
                        </div>
                        <div className={styles["price-container"]}>
                            <article>
                                <h3>Стоимость</h3>
                                <p>{product.price_per_unit} P</p>
                            </article>
                        </div>
                    </div>
                </div>
                <div className={styles["details-base"]}>
                    <div className={styles["details-products__slide"]}>
                        <div className={styles["img-container__top"]}>
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.image}
                                    alt={`Product Image ${index + 1}`}
                                    className={activeIndex === index ? styles.active : ""}
                                />
                            ))}
                        </div>
                        <div className={styles["img-container__base"]}>
                            {product.images && product.images.length > 0 && product.images[mainImage] ? (
                            <img
                                src={product.images[mainImage].image}
                                alt={`Main Product Image`}
                            />
                            ) : (
                                <div>Изображение отсутствует</div>
                            )}
                        </div>
                        <div className={styles["button-container__down"]}>
                        <button onClick={handleSlideLeft}>
                                <svg width={58} height={58}>
                                    <use xlinkHref={sprite + "#slide-left"}/>
                                </svg>
                            </button>
                            <div className={styles["indicators-container"]}>
                                {[...Array(maxIndicators)].map((_, index) => (
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
                            <p>{product.description}</p>
                        </article>
                        <div className={styles.quantity}>
                            <button onClick={handleDecreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncreaseQuantity}>+</button>
                        </div>
                        <p>Общая стоимость: {totalPrice} P</p>
                        <button onClick={handleBuyProduct}>Купить</button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ProductDetails;
