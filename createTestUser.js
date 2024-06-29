const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./server/models/User');

// Загрузка переменной окружения, если она не была загружена
require('dotenv').config();

async function main() {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Подключение к MongoDB установлено');

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash('123123', 10);

        // Создание нового пользователя с указанием имени, роли и других полей
        const newUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            role: 'admin', // Установите 'admin' или 'user' в зависимости от роли
        });

        // Сохранение пользователя в базе данных
        await newUser.save();
        console.log('Тестовый пользователь успешно создан');
    } catch (error) {
        console.error('Не удалось создать тестового пользователя:', error);
    } finally {
        // Закрытие соединения с базой данных после завершения операции
        await mongoose.disconnect();
        console.log('Соединение с MongoDB закрыто');
    }
}

// Вызов основной функции
main();
