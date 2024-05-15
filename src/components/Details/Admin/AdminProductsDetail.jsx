import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditProductForm from "../../Dashboard/Admin/EditProductForm.jsx";
import styles from '../../../styles/adminproductsdetail.module.css';
import sprite from "../../../sprite.svg";
import { API } from "../../../utils/APi";
import {toast} from "react-toastify";

function AdminProductsDetail(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`${API}/products/products/${productId}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setProduct(productResponse.data);
            } catch (error) {
                console.error('Ошибка при получении данных о продукте:', error);
            }
        };

        fetchData();
    }, [productId, token]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${API}/products/products/${productId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setProduct(null);
            toast.success("Товар успешно удален!")
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        }
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await axios.delete(`${API}/products/delete-image/${imageId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setProduct((prevProduct) => ({
                ...prevProduct,
                images: prevProduct.images.filter((image) => image.id !== imageId)
            }));
            toast.success("Изображение успешно удалено!")
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
        }
    };


    return (
        <div className={styles.container}>
            {product ? (
                <div className={styles.product}>
                    {!editMode ? (
                        <ul className={styles["product-details"]}>
                            <li><span>Название:</span> {product.name}</li>
                            <li><span>Описание:</span> {product.description}</li>
                            <li><span>Количество:</span> {product.quantity}</li>
                            <li><span>Тип продукта:</span> {product.product_type}</li>
                            <li><span>Цена за единицу:</span> {product.price_per_unit}</li>
                            <li><span>Производитель:</span> {product.manufacturer}</li>
                            {product.images && product.images.length > 0 && (
                                <li>
                                    <span>Изображения:</span>
                                    <div className={styles.imagesContainer}>
                                        {product.images.map((image, index) => (
                                            <div key={index} className={styles.imageWrapper}>
                                                <img
                                                    src={image.image}
                                                    alt={`Изображение ${index + 1}`}
                                                    className={styles.productImage}
                                                />
                                                <button
                                                    className={styles.deleteImageButton}
                                                    onClick={() => handleDeleteImage(image.id)}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            )}
                            <div className={styles['btn-container']}>
                                <button onClick={handleEditClick} className={styles['btn-edit']}>
                                    Редактировать
                                    <svg className='logo' width={24} height={24}>
                                        <use xlinkHref={sprite + "#pencil-icon"} />
                                    </svg>
                                </button>
                                <button onClick={handleDeleteClick} className={styles['btn-delete']}>Удалить</button>
                            </div>
                        </ul>
                    ) : (
                        <EditProductForm product={product} toggleEdit={handleCancelClick} />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AdminProductsDetail;
