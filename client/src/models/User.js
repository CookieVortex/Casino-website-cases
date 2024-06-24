const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    steamId: String,
    displayName: String,
    avatar: String
});

module.exports = mongoose.model('User', userSchema);
