const bookRoutes = require('./routes/bookRoutes');

module.exports = (app) => {
  app.use('/api/books', bookRoutes);
};