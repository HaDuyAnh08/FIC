const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
//require('./models/dbConnect');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');

const DB = process.env.DB_URL;
console.log('DB--', DB);
mongoose
    .connect(DB)
    .then(() => {
        console.log('DB connection established');
    })
    .catch((err) => {
        console.log('DB CONNECTION FAILED');
        console.log('ERR: ', err);
    });

app.use(cors());
app.use('/auth/', authRoutes); // <- NEW LINE

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})