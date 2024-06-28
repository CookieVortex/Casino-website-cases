// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    isAdmin: Boolean,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
