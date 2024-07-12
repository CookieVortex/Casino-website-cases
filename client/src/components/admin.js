import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Admin = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [dropRate, setDropRate] = useState('');
    const [rarity, setRarity] = useState('Common');
    const [selectedCases, setSelectedCases] = useState([]);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetchCases();
        fetchItems();
    }, []);

    const fetchCases = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/case/cases`);
            setCases(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке кейсов:', error);
        }
    };

    const handleCaseSelect = (caseItem) => {
        setSelectedCases((prevSelectedCases) =>
            prevSelectedCases.some((c) => c._id === caseItem._id)
                ? prevSelectedCases.filter((c) => c._id !== caseItem._id)
                : [...prevSelectedCases, caseItem]
        );
    };

    const handleSubmitCase = async (e) => {
        e.preventDefault();
        const caseData = { name, price, imageUrl, items };

        try {
            await axios.post(`${API_BASE_URL}/case/create`, caseData);
            setName('');
            setPrice('');
            setImageUrl('');
            setItems([]);
            fetchCases();
        } catch (error) {
            console.error('Ошибка при создании кейса:', error);
        }
    };

    const handleSubmitItem = async (e) => {
        e.preventDefault();
        if (selectedCases.length === 0) {
            alert('Выберите кейсы для добавления предмета.');
            return;
        }

        const itemData = { itemName, itemImageUrl, dropRate, rarity };

        try {
            for (let i = 0; i < selectedCases.length; i++) {
                itemData.caseId = selectedCases[i]._id;
                await axios.post(`${API_BASE_URL}/item/create`, itemData);
            }

            setItemName('');
            setItemImageUrl('');
            setDropRate('');
            setRarity('Common');
            fetchItems();
        } catch (error) {
            console.error('Ошибка при создании предмета:', error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/item/items`);
            setItems(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке предметов:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${API_BASE_URL}/item/delete/${itemId}`);
            fetchItems();
        } catch (error) {
            console.error(`Ошибка при удалении предмета с ID ${itemId}:`, error);
        }
    };

    return (
        <div className="create-item-container">
            <div className="item-list">
                <p className="case-list">Список предметов</p>
                {items.length === 0 ? (
                    <p>Нет доступных предметов</p>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className="item">
                            <div className="item-content">
                                <h4>{item.itemName}</h4>
                                <img src={item.itemImageUrl} alt={item.itemName} className="item-image" />
                                <p>
                                    <span className="large-text">Шанс выпадения:</span>
                                    <span className="small-text"> {item.dropRate} %</span>
                                </p>
                                <p>
                                    <span className="large-text">Редкость:</span>
                                    <span className="small-text"> {item.rarity}</span>
                                </p>
                                <p>
                                    <span className="large-text">Имя кейса:</span>
                                    <span className="small-text">
                                        {cases.find((caseItem) => caseItem._id === item.caseId)?.name || 'Неизвестно'}
                                    </span>
                                </p>
                                <button className="ItemListDeleteBtn" onClick={() => handleDeleteItem(item._id)}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cases-list">
                <p className="case-list">Список кейсов</p>
                {cases.map((caseItem) => (
                    <div
                        key={caseItem._id}
                        onClick={() => handleCaseSelect(caseItem)}
                        className={`case-item ${selectedCases.some((c) => c._id === caseItem._id) ? 'selected' : ''}`}
                    >
                        <h4>{caseItem.name} - Цена: € {caseItem.price}</h4>
                        <ul>
                            {caseItem.items &&
                                caseItem.items.map((item) => (
                                    <li key={item._id}>
                                        {item.itemName} - Редкость: {item.rarity}
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="create-item">
                <p className="case-list">Создать предмет</p>
                <form onSubmit={handleSubmitItem}>
                    <div className="form-group">
                        <label className="form-label">Название предмета:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">URL изображения предмета:</label>
                        <input
                            type="text"
                            className="form-input"
                            value={itemImageUrl}
                            onChange={(e) => setItemImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Шанс выпадения:</label>
                        <input
                            type="number"
                            className="form-input"
                            value={dropRate}
                            onChange={(e) => setDropRate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Редкость:</label>
                        <select className="form-input" value={rarity} onChange={(e) => setRarity(e.target.value)}>
                            <option value="Common">Обычный</option>
                            <option value="Rare">Редкий</option>
                            <option value="Epic">Эпический</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Выбранные кейсы:</label>
                        <ul>
                            {selectedCases.map((caseItem) => (
                                <li key={caseItem._id}>{caseItem.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="submit-button">
                        Создать предмет
                    </button>
                </form>
            </div>

            <form className="create-case-form" onSubmit={handleSubmitCase}>
                <p className="case-list">Создать кейс</p>
                <div className="form-group">
                    <label className="form-label">Название кейса:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Цена:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Ссылка на изображение:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Создать кейс
                </button>
            </form>
        </div>
    );
};

export default Admin;
