// migrations/add_price_to_case_items.js

const mongoose = require('mongoose');
const CaseItem = require('../models/caseItem');

mongoose.connect('mongodb://localhost:27017/casino', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', async () => {
    try {
        // Находим все записи без поля price
        const itemsToUpdate = await CaseItem.find({ price: { $exists: false } });

        // Обновляем каждую запись, добавляя поле price со значением 0
        const updatePromises = itemsToUpdate.map(async (item) => {
            item.price = 0;
            await item.save();
        });

        await Promise.all(updatePromises);

        console.log('Миграция успешно завершена.');
        process.exit(0);
    } catch (error) {
        console.error('Ошибка при выполнении миграции:', error);
        process.exit(1);
    }
});
