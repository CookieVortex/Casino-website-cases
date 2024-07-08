const express = require('express');
const router = express.Router();
const Case = require('../models/case');
const CaseItem = require('../models/caseItem');

// Создание кейса без предметов
router.post('/create', async (req, res) => {
    try {
        const { name, price, imageUrl, items } = req.body;

        const newCase = new Case({
            name,
            price,
            imageUrl
        });

        await newCase.save();

        res.status(201).json({ message: 'Case created successfully', case: newCase });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Маршрут для получения всех кейсов
router.get('/cases', async (req, res) => {
    try {
        const cases = await Case.find(); // Получение всех кейсов из базы данных
        res.json(cases); // Отправка кейсов в формате JSON клиенту
    } catch (err) {
        console.error('Error fetching cases:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Отправка статуса 500 в случае ошибки
    }
});

// Получение кейса по ID
router.get('/:id', async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id).populate('items');
        if (!caseData) {
            return res.status(404).json({ message: 'Case not found' });
        }
        res.status(200).json(caseData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение всех предметов в кейсе
router.get('/:id/items', async (req, res) => {
    try {
        const items = await CaseItem.find({ caseId: req.params.id });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Обновление предмета в кейсе
router.put('/item/:id', async (req, res) => {
    try {
        const updatedItem = await CaseItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Удаление предмета в кейсе
router.delete('/item/:id', async (req, res) => {
    try {
        const deletedItem = await CaseItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
