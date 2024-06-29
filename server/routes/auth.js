// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware для авторизации по роли
const authorize = (role) => {
    return (req, res, next) => {
        // Здесь проверяется роль пользователя на соответствие требуемой роли (admin, user и т.д.)
        if (req.user && req.user.role === role) {
            next(); // Продолжаем выполнение запроса, если пользователь авторизован с требуемой ролью
        } else {
            res.status(403).json({ message: 'Unauthorized' }); // Отказ в доступе, если пользователь не авторизован
        }
    };
};

// Маршрут для логина
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Генерация токена
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).send('Server error');
    }
});

// Пример защищенного маршрута с использованием middleware для авторизации
router.get('/protected-route', authorize('admin'), (req, res) => {
    res.send('You have access to this protected route!');
});

module.exports = router;
