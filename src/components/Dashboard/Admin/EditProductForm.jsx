import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditProductForm({ product, toggleEdit }) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [productType, setProductType] = useState(product.product_type);
    const [pricePerUnit, setPricePerUnit] = useState(product.price_per_unit);
    const [manufacturer, setManufacturer] = useState(product.manufacturer);
    const [error, setError] = useState('');


    const handleEditProduct = () => {
        const data = {
            name: name,
            description: description,
            quantity: quantity,
            product_type: productType,
            price_per_unit: pricePerUnit,
            manufacturer: manufacturer
        };

        axios.put(`http://192.168.0.106:8000/products/products/${product.id}/`, data)
            .then(response => {
                toast.success('Product updated successfully');
                toggleEdit();
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setError('Error updating product');
            });
    };

    const handleCancel = () => {
        toggleEdit();
    };

    return (
        <div>
            <h2>Редактирование продукта</h2>
            <form>
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
                <label>Цена за еденицу:</label>
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
                {error && <p>{error}</p>}
                <button type="button" onClick={handleEditProduct}>Сохранить</button>
                <button type="button" onClick={handleCancel}>Отменить</button>
            </form>
        </div>
    );
}

export default EditProductForm;
