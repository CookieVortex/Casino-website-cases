const express = require('express');
const router = express.Router();

// Пример маршрута для получения всех кейсов
router.get('/', (req, res) => {
    res.send('Маршрут для получения всех кейсов');
});

module.exports = router;
