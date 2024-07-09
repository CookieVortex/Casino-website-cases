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

module.exports = router;
