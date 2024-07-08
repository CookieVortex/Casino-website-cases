import React, { useState } from 'react';
import axios from 'axios';
import './CreateCase.css';

const CreateCase = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [dropRate, setDropRate] = useState('');

    const handleSubmit = async (e) => {
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
            console.error(error);
        }
    };

    const handleAddItem = () => {
        const newItem = {
            itemName,
            itemImageUrl,
            dropRate: parseInt(dropRate),
        };
        setItems([...items, newItem]);
        setItemName('');
        setItemImageUrl('');
        setDropRate('');
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <form className="create-case-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Название кейса:</label>
                <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label className="form-label">Цена:</label>
                <input type="number" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
                <label className="form-label">Ссылка на изображение:</label>
                <input type="text" className="form-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            </div>

            <div className="form-group">
                <h2>Добавить предмет</h2>
                <div>
                    <label className="form-label">Название предмета:</label>
                    <input type="text" className="form-input" value={itemName}
                           onChange={(e) => setItemName(e.target.value)} required/>
                </div>
                <div>
                    <label className="form-label">Ссылка на изображение предмета:</label>
                    <input type="text" className="form-input" value={itemImageUrl}
                           onChange={(e) => setItemImageUrl(e.target.value)} required/>
                </div>
                <div>
                    <label className="form-label">Шанс выпадения:</label>
                    <input type="number" className="form-input" value={dropRate}
                           onChange={(e) => setDropRate(e.target.value)} required/>
                </div>
                <button type="submit" className="submit-button">Создать кейс</button>
                <button type="button" className="add-item-button" onClick={handleAddItem}>Добавить предмет</button>
            </div>

            {items.length > 0 && (
                <div className="added-items">
                    <h2>Добавленные предметы</h2>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className="added-item">
                                <p>{item.itemName}</p>
                                <p>Шанс выпадения: {item.dropRate}%</p>
                                <button type="button" className="remove-item-button" onClick={() => handleRemoveItem(index)}>Удалить предмет</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default CreateCase;
