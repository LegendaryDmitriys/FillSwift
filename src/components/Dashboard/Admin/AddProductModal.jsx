import React from 'react';
import styles from '../../../styles/addproductmodal.module.css';

const AddProductModal = ({ showModal, closeModal, handleSubmit, handleInputChange, newProduct, handleFileChange, selectedFile  }) => {
    return (
        showModal && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={closeModal}>
                        &times;
                    </span>
                    <h2 className={styles["addproduct-title"]}>Создать новый продукт</h2>
                    <form onSubmit={handleSubmit} className={styles['addproduct_form']}>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Основные настройки:</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <input
                                    type="text"
                                    placeholder="Наименование продукта"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                />
                                <article className={styles["description-settings"]}>
                                    <label>Описание</label>
                                    <textarea
                                        className={styles["fixid-textarea"]}
                                        type="text"
                                        placeholder="Описание"
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                    />
                                </article>
                            </div>
                        </div>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Количество товара</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <input
                                    type="number"
                                    placeholder="Количество"
                                    name="quantity"
                                    value={newProduct.quantity}
                                    onChange={handleInputChange}
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Категория продукта</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <input
                                    type="text"
                                    placeholder="Тип продукта"
                                    name="product_type"
                                    value={newProduct.product_type}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Цена</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <input
                                    type="number"
                                    placeholder="Цена за единицу"
                                    name="price_per_unit"
                                    value={newProduct.price_per_unit}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Производитель</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <input
                                    type="text"
                                    placeholder="Производитель"
                                    name="manufacturer"
                                    value={newProduct.manufacturer}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles["product-settings"]}>
                            <div className={styles["product-settings-left"]}>
                                <p>Картинка</p>
                            </div>
                            <div className={styles["product-settings-right"]}>
                                <label>Изображение:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {selectedFile && <p>Выбранный файл: {selectedFile.name}</p>}
                            </div>
                        </div>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddProductModal;
