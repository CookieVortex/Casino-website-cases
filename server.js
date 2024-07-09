const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const caseItemRoutes = require('./server/routes/caseItemRoutes');
require('dotenv').config();

const userRouter = require('./server/routes/user');
const authRouter = require('./server/routes/auth');
const caseRouter = require('./server/routes/case');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/case', caseRouter);
app.use('/api/item', caseItemRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
