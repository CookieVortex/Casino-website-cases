const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Маршрут для добавления нового пользователя
router.post('/add', async (req, res) => {
    const {googleId, email, name} = req.body;

    try {
        let user = await User.findOne({googleId});

        if (!user) {
            user = new User({googleId, email, name});
            await user.save();
            res.status(201).send({message: 'Пользователь успешно добавлен'});
        } else {
            res.status(200).send({message: 'Пользователь уже существует'});
        }
    } catch (error) {
        res.status(500).send({message: 'Ошибка сервера', error});
    }
});


router.get('/balance', async (req, res) => {
    const {googleId} = req.query;
    try {
        const user = await User.findOneAndUpdate(
            {googleId},
            {$inc: {balance: 0}},
            {new: true}
        );
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({balance: user.balance});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
});

// Маршрут для обновления баланса
router.post('/update-balance', async (req, res) => {
    const {googleId, balance} = req.body;

    try {
        const user = await User.findOneAndUpdate(
            {googleId},
            {balance},
            {new: true}
        );

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json({message: 'Balance updated successfully', balance: user.balance});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
});


module.exports = router;
