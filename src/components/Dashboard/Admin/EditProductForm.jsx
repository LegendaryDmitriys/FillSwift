import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from '../../../styles/editproductform.module.css'
import { API } from "../../../utils/APi";

function EditProductForm({ product, toggleEdit }) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [productType, setProductType] = useState(product.product_type);
    const [pricePerUnit, setPricePerUnit] = useState(product.price_per_unit);
    const [manufacturer, setManufacturer] = useState(product.manufacturer);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);

    const handleEditProduct = () => {
        const data = {
            name,
            description,
            quantity,
            product_type: productType,
            price_per_unit: pricePerUnit,
            manufacturer
        };

        const formData = new FormData();
        formData.append('image', image);
        formData.append('data', JSON.stringify(data));

        axios.put(`${API}/products/products/${product.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                toast.success('Product updated successfully');
                toggleEdit();
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setError('Error updating product');
            });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCancel = () => {
        toggleEdit();
    };

    console.log(image); // Проверяем, что изображение корректно передается

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Редактирование продукта</h2>
            <form className={styles["edit-product-form"]}>
                <label>Наименование:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Описание:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Количество:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <label>Тип продукта:</label>
                <input
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    required
                />
                <label>Цена за единицу:</label>
                <input
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    required
                />
                <label>Производитель:</label>
                <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    required
                />
                <label>Изображение:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {error && <p>{error}</p>}
                <button type="button" onClick={handleEditProduct} className={styles["btn-save"]}>Сохранить</button>
                <button type="button" onClick={handleCancel} className={styles['btn-cancel']}>Отменить</button>
            </form>
        </div>
    );
}

export default EditProductForm;
