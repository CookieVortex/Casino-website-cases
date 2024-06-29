const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
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

        const hashedPassword = await bcrypt.hash('123123', 10);

        // Генерация нового уникального googleId с помощью uuid
        const googleId = uuidv4();

        const newUser = new User({
            googleId: googleId,
            email: 'test@test.com',
            name: 'Admin Admin',
            password: hashedPassword,
            role: 'admin',
            balance: 100
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
