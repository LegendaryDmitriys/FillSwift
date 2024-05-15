import React, { useState } from 'react';
import axios from 'axios';
import { API } from "../../../utils/APi";
import styles from '../../../styles/editproductform.module.css';
import {toast} from "react-toastify";

function EditProductForm({ product, toggleEdit }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        product_type: product.product_type,
        price_per_unit: product.price_per_unit,
        manufacturer: product.manufacturer,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const token = localStorage.getItem('token');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${API}/products/products/${product.id}/`, updatedProduct, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                await axios.post(
                    `${API}/products/upload-image/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            product_id: product.id,
                        },
                    }
                );
            }

            toggleEdit();
            toast.success('Продукт успешно обновлен!')
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
            toast.error(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Название:
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Описание:
                <input
                    type="text"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Количество:
                <input
                    type="number"
                    name="quantity"
                    value={updatedProduct.quantity}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Тип продукта:
                <input
                    type="text"
                    name="product_type"
                    value={updatedProduct.product_type}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Цена за единицу:
                <input
                    type="number"
                    name="price_per_unit"
                    value={updatedProduct.price_per_unit}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Производитель:
                <input
                    type="text"
                    name="manufacturer"
                    value={updatedProduct.manufacturer}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Изображение:
                <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={toggleEdit}>Отмена</button>
        </form>
    );
}

export default EditProductForm;
