const express = require('express');
const router = express.Router();
const Case = require('../models/case');
const CaseItem = require('../models/caseItem');

// Создание кейса с предметами
router.post('/create', async (req, res) => {
    try {
        const {name, price, imageUrl, items} = req.body;

        const newCase = new Case({
            name,
            price,
            imageUrl,
            items: []
        });

        await newCase.save();

        const caseItems = items.map(item => ({
            caseId: newCase._id,
            itemName: item.itemName,
            itemImageUrl: item.itemImageUrl,
            dropRate: item.dropRate,
            rarity: item.rarity,
            price: item.price
        }));

        const createdItems = await CaseItem.insertMany(caseItems);
        newCase.items = createdItems.map(item => item._id);
        await newCase.save();

        res.status(201).json({message: 'Case created successfully', case: newCase});
    } catch (error) {
        console.error('Error creating case:', error);
        res.status(500).json({error: error.message});
    }
});

// Получение всех кейсов
router.get('/cases', async (req, res) => {
    try {
        const cases = await Case.find().populate('items');
        res.json(cases);
    } catch (err) {
        console.error('Error fetching cases:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Получение кейса по ID
router.get('/:id', async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id).populate('items');
        if (!caseData) {
            return res.status(404).json({message: 'Case not found'});
        }
        res.status(200).json(caseData);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Получение всех предметов в кейсе
router.get('/:id/items', async (req, res) => {
    try {
        const items = await CaseItem.find({caseId: req.params.id});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Обновление предмета в кейсе
router.put('/item/:id', async (req, res) => {
    try {
        const updatedItem = await CaseItem.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedItem) {
            return res.status(404).json({message: 'Item not found'});
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
