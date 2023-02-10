require('dotenv').config({ path: './config/config.env' });

const cors = require('cors');
const { urlencoded } = require('express');
const express = require('express');

const PORT = process.env.PORT;
const connectDB = require('./config/db');
const dictionaryRoutes = require('./routes/dictionary');
const favoriteWordsRoutes = require('./routes/favoriteWords');
const userRoutes = require('./routes/user');

const app = express();

// middleware 
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api/dictionary', dictionaryRoutes)
app.use('/api/favoriteWords', favoriteWordsRoutes);
app.use('/api/user', userRoutes)

// connect to DB before listening
connectDB().then(() => {
    app.listen(PORT, console.log(`server running at port ${PORT}`));
});