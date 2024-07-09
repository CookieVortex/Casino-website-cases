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

    // Состояния для создания предмета
    const [selectedCase, setSelectedCase] = useState(null);
    const [itemNameItem, setItemNameItem] = useState('');
    const [itemImageUrlItem, setItemImageUrlItem] = useState('');
    const [dropRateItem, setDropRateItem] = useState('');
    const [rarity, setRarity] = useState('Common');
    const [caseId, setCaseId] = useState('');
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetchCases();
    }, []);

    // Загрузка списка всех кейсов
    const fetchCases = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/case/cases');
            setCases(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке кейсов:', error);
        }
    };

    // Функция для выбора кейса из списка
    const handleCaseSelect = (caseItem) => {
        setSelectedCase(caseItem);
        setCaseId(caseItem._id);
    };

    // Отправка данных для создания кейса
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
        } catch (error) {
            console.error('Ошибка при создании кейса:', error);
        }
    };

    // Отправка данных для создания предмета
    const handleSubmitItem = async (e) => {
        e.preventDefault();
        const itemData = {
            itemName: itemNameItem,
            itemImageUrl: itemImageUrlItem,
            dropRate: dropRateItem,
            rarity: rarity,
            caseId: caseId,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/item/create', itemData);
            console.log(response.data);
            setItemNameItem('');
            setItemImageUrlItem('');
            setDropRateItem('');
            setRarity('Common');
            setSelectedCase(null);
            fetchCases();
        } catch (error) {
            console.error('Ошибка при создании предмета:', error);
        }
    };

    return (
        <div className="create-item-container">
            <div className="cases-list">
                <h3>Все кейсы</h3>
                {cases.map(caseItem => (
                    <div key={caseItem._id} onClick={() => handleCaseSelect(caseItem)}
                         className={`case-item ${selectedCase === caseItem ? 'selected' : ''}`}>
                        <h4>{caseItem.name} - Цена: ${caseItem.price} <span
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

            {/* Форма для создания предмета */}
            <div className="create-item">
                <h2>Создать предмет</h2>
                <form onSubmit={handleSubmitItem}>
                    <div className="form-group">
                        <label className="form-label">Название предмета:</label>
                        <input type="text" className="form-input" value={itemNameItem}
                               onChange={(e) => setItemNameItem(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">URL изображения предмета:</label>
                        <input type="text" className="form-input" value={itemImageUrlItem}
                               onChange={(e) => setItemImageUrlItem(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Шанс выпадения:</label>
                        <input type="number" className="form-input" value={dropRateItem}
                               onChange={(e) => setDropRateItem(e.target.value)} required/>
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
                               onChange={(e) => setCaseId(e.target.value)} required/>
                    </div>
                    <button type="submit" className="submit-button">Создать предмет</button>
                </form>
            </div>

            {/* Форма для создания кейса */}
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
