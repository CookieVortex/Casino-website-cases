const express = require('express');
const steam = require('steam-login');
const morgan = require('morgan'); // Подключаем модуль для логирования

const app = express();

// Middleware для логирования
app.use(morgan('dev'));

// Другие настройки и middleware (сессии, steam-login и т.д.)

// Главная страница, проверяет авторизацию пользователя
app.get('/', function(req, res) {
    res.send(req.user == null ? 'not logged in' : 'hello ' + req.user.username).end();
});

// Маршрут для инициации аутентификации через Steam
app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('/');
});

// Маршрут для верификации аутентификации через Steam
app.get('/verify', steam.verify(), function(req, res) {
    res.send(req.user).end();
});

// Маршрут для выхода пользователя
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

// Прослушивание порта 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
