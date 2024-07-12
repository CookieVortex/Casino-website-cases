const express = require('express');
const router = express.Router();
const CaseItem = require('../models/caseItem');
const Case = require('../models/case');

// Создание нового предмета
router.post('/create', async (req, res) => {
    try {
        const { itemName, itemImageUrl, dropRate, rarity, caseId } = req.body;

        const existingCase = await Case.findById(caseId);
        if (!existingCase) {
            return res.status(404).json({ error: 'Case not found' });
        }

        const newItem = new CaseItem({
            caseId,
            itemName,
            itemImageUrl,
            dropRate,
            rarity
        });

        await newItem.save();

        // Добавляем созданный предмет в кейс
        existingCase.items.push(newItem._id);
        await existingCase.save();

        res.status(201).json({ message: 'Item created and added to case successfully', item: newItem });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await CaseItem.find();
        res.json(items);
    } catch (error) {
        console.error('Ошибка при загрузке предметов:', error);
        res.status(500).json({ error: 'Ошибка сервера при загрузке предметов' });
    }
});

// Пример маршрута для удаления предмета по ID
router.delete('/delete/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const deletedItem = await CaseItem.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Предмет не найден' });
        }

        res.status(200).json({ message: 'Предмет успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении предмета:', error);
        res.status(500).json({ error: 'Ошибка сервера при удалении предмета' });
    }
});

// Получение случайных предметов
router.get('/api/item/items', async (req, res) => {
    try {
        const items = await CaseItem.find();
        res.json(items);
    } catch (error) {
        console.error('Ошибка при загрузке предметов:', error);
        res.status(500).json({ error: 'Ошибка сервера при загрузке предметов' });
    }
});

module.exports = router;
