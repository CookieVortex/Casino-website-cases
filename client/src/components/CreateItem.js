import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CreateItem.css';

const CreateItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [dropRate, setDropRate] = useState('');
    const [rarity, setRarity] = useState('Common');
    const [caseId, setCaseId] = useState('');
    const [cases, setCases] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);

    useEffect(() => {
        fetchCases();
        fetchItems();
    }, []);

    const fetchCases = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/case/cases');
            setCases(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке кейсов:', error);
        }
    };

    const handleCaseSelect = (caseItem) => {
        setSelectedCase(caseItem);
        setCaseId(caseItem._id);
    };

    const handleSubmitCase = async (e) => {
        e.preventDefault();
        const caseData = {
            name,
            price,
            imageUrl,
            items,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/case/create', caseData);
            console.log(response.data);
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
        if (!caseId) {
            alert('Выберите кейс для добавления предмета.');
            return;
        }

        const itemData = {
            itemName,
            itemImageUrl,
            dropRate,
            rarity,
            caseId,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/item/create', itemData);
            console.log(response.data);
            setItemName('');
            setItemImageUrl('');
            setDropRate('');
            setRarity('Common');
            fetchItems(); // Обновляем список предметов после создания нового предмета
        } catch (error) {
            console.error('Ошибка при создании предмета:', error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/item/items');
            setItems(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке предметов:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/item/delete/${itemId}`);
            fetchItems(); // Обновляем список предметов после удаления
        } catch (error) {
            console.error(`Ошибка при удалении предмета с ID ${itemId}:`, error);
        }
    };

    return (

        <div className="create-item-container">
            <div className="item-list">
                <h3>Список предметов</h3>
                {items.length === 0 ? (
                    <p>Нет доступных предметов</p>
                ) : (
                    items.map(item => (
                        <div key={item._id} className="item">
                            <div className="item-content">
                                <h4>{item.itemName}</h4>
                                <img src={item.itemImageUrl} alt={item.itemName} className="item-image"/>
                                <p>Шанс выпадения: {item.dropRate} %</p>
                                <p>Редкость: {item.rarity}</p>
                                <p>Имя
                                    кейса: {cases.find(caseItem => caseItem._id === item.caseId)?.name || 'Неизвестно'}</p>
                                <p className="caseIdStyle">ИД: {item.caseId}</p>
                                <button className="ItemListDeleteBtn"
                                        onClick={() => handleDeleteItem(item._id)}>Удалить
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>

            <div className="cases-list">
                <h3>Все кейсы</h3>
                {cases.map(caseItem => (
                    <div key={caseItem._id} onClick={() => handleCaseSelect(caseItem)}
                         className={`case-item ${selectedCase === caseItem ? 'selected' : ''}`}>
                        <h4>{caseItem.name} - Цена: € {caseItem.price} <span
                            className="case-id">ID: {caseItem._id}</span></h4>
                        <ul>
                            {caseItem.items && caseItem.items.map(item => (
                                <li key={item._id}>
                                    {item.itemName} - Редкость: {item.rarity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="create-item">
                <h2>Создать предмет</h2>
                <form onSubmit={handleSubmitItem}>
                    <div className="form-group">
                        <label className="form-label">Название предмета:</label>
                        <input type="text" className="form-input" value={itemName}
                               onChange={(e) => setItemName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">URL изображения предмета:</label>
                        <input type="text" className="form-input" value={itemImageUrl}
                               onChange={(e) => setItemImageUrl(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Шанс выпадения:</label>
                        <input type="number" className="form-input" value={dropRate}
                               onChange={(e) => setDropRate(e.target.value)} required/>
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
                        <label className="form-label">ID кейса:</label>
                        <input type="text" className="form-input" value={caseId}
                               onChange={(e) => setCaseId(e.target.value)} readOnly/>
                    </div>
                    <button type="submit" className="submit-button">Создать предмет</button>
                </form>
            </div>

            <form className="create-case-form" onSubmit={handleSubmitCase}>
                <h2>Создать кейс</h2>
                <div className="form-group">
                    <label className="form-label">Название кейса:</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)}
                           required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Цена:</label>
                    <input type="number" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)}
                           required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Ссылка на изображение:</label>
                    <input type="text" className="form-input" value={imageUrl}
                           onChange={(e) => setImageUrl(e.target.value)} required/>
                </div>
                <button type="submit" className="submit-button">Создать кейс</button>
            </form>
        </div>
    );
};

export default CreateItem;
