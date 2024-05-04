import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import styles from '../../../styles/dashboardproducts.module.css';
import HeaderBoard from '../HeaderBoard';

function Products(props) {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        product_type: '',
        price_per_unit: 0,
        manufacturer: '',
        image: ''
    });

    useEffect(() => {
        axios
            .get('http://192.168.0.106:8000/products/products/')
            .then((productsResponse) => {
                setProducts(productsResponse.data);
            })
            .catch((error) => {
                console.error('Ошибка получения данных:', error);
            });
    }, []);

    const handleAddProductClick = () => {
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('quantity', newProduct.quantity);
        formData.append('product_type', newProduct.product_type);
        formData.append('price_per_unit', newProduct.price_per_unit);
        formData.append('manufacturer', newProduct.manufacturer);
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://192.168.0.106:8000/products/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProducts([...products, response.data]);
            setShowForm(false);
            setNewProduct({
                name: '',
                description: '',
                quantity: 0,
                product_type: '',
                price_per_unit: 0,
                manufacturer: '',
            });
            setSelectedFile(null);
        } catch (error) {
            console.error('Ошибка при создании продукта:', error);
        }
    };


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div>
            <HeaderBoard title={'Товары'} description={'Здесь отображаются все товары в магазине'} />
            <div className={styles.addButtonContainer}>
                <button onClick={handleAddProductClick} className={styles.addButton}>
                    Добавить
                </button>
            </div>
            {showForm && (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Название"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Описание"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Количество"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <input
                            type="text"
                            placeholder="Тип продукта"
                            name="product_type"
                            value={newProduct.product_type}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Цена за единицу"
                            name="price_per_unit"
                            value={newProduct.price_per_unit}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Производитель"
                            name="manufacturer"
                            value={newProduct.manufacturer}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            )}
            {products.map((product) => (
                <div key={product.id} className={styles.item}>
                    <Link to={`${ROUTES.AdminProductsDetails}/${product.id}`}>
                        {product.images.length > 0 && (
                            <img src={product.images[0].image} alt={product.name} className={styles.image} />
                        )}
                        <div className={styles.infoContainer}>
                            <div className={styles.left}>
                                <p className={styles.name}>{product.name}</p>
                                <p className={styles.price}>
                                    {product.price_per_unit} {product.currency}
                                </p>
                            </div>
                            <div className={styles.right}>
                                <p className={styles.type}>{product.product_type}</p>
                                <p className={styles.manufacturer}>{product.manufacturer}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Products;
