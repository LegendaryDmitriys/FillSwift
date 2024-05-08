import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditProductForm from "../../Dashboard/Admin/EditProductForm";

import styles from '../../../styles/adminproductsdetail.module.css'
import sprite from "../../../sprite.svg";


function AdminProductsDetail(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`http://192.168.0.106:8000/products/products/${productId}`, {
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
            await axios.delete(`http://192.168.0.106:8000/products/products/${productId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setProduct(null);
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
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
                            <div className={styles['btn-container']}>
                                <button onClick={handleEditClick} className={styles['btn-edit']}> Редактировать
                                    <svg className='logo' width={24} height={24}>
                                        <use xlinkHref={sprite + "#pencil-icon"}/>
                                    </svg></button>
                                <button onClick={handleDeleteClick} className={styles['btn-delete']}>Удалить</button>
                            </div>
                        </ul>
                    ) : (
                        <EditProductForm product={product} toggleEdit={handleCancelClick}
                                         className="edit-product-form"/>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default AdminProductsDetail;
