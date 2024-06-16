const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Порт, на котором будет работать сервер

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/case-opening-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

const casesRouter = require('./routes/cases');
app.use('/api/cases', casesRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
