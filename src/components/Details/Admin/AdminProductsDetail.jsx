import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditProductForm from "../../Dashboard/Admin/EditProductForm";


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
        <div>
            {product ? (
                <div>
                    {!editMode ? (
                        <ul>
                            <li>{product.name}</li>
                            <li>{product.description}</li>
                            <li>{product.quantity}</li>
                            <li>{product.product_type}</li>
                            <li>{product.price_per_unit}</li>
                            <li>{product.manufacturer}</li>
                            <button onClick={handleEditClick}>Редактировать</button>
                            <button onClick={handleDeleteClick}>Удалить</button>
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
