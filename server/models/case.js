const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
