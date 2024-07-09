const mongoose = require('mongoose');

const caseItemSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    itemName: { type: String, required: true },
    itemImageUrl: { type: String, required: true },
    dropRate: { type: Number, required: true },
    rarity: { type: String, enum: ['Common', 'Rare', 'Epic'], required: true }
});

const CaseItem = mongoose.model('CaseItem', caseItemSchema);

module.exports = CaseItem;
