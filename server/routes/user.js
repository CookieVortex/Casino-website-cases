const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Маршрут для добавления нового пользователя
router.post('/add', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ googleId, email, name });
            await user.save();
            res.status(201).send({ message: 'Пользователь успешно добавлен' });
        } else {
            res.status(200).send({ message: 'Пользователь уже существует' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Ошибка сервера', error });
    }
});

module.exports = router;
