const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bookRouter = require('./router/bookRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Sử dụng router
app.use('/api', bookRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
