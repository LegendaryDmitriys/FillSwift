import React, { useState } from 'react';
import styles from '../../styles/sortpopup.module.css';

const SortPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSortOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.sort}>
            <p onClick={togglePopup}>Сортировать по: <span className={styles.selectedOption}>{selectedOption || 'выберите опцию'}</span></p>
            {isOpen && (
                <article className={styles["button-sort"]}>
                    <button onClick={() => handleSortOptionClick('Цена')}>Цена</button>
                    <button onClick={() => handleSortOptionClick('Категория')}>Категория</button>
                    <button onClick={() => handleSortOptionClick('Бренд')}>Бренд</button>
                    <button onClick={() => handleSortOptionClick('Количество на складе')}>Количество на складе</button>
                </article>
            )}
        </div>
    );
};

export default SortPopup;
