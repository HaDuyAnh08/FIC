const apiRouter = require('./routes/bookRoutes');

module.exports = function (app) {
  app.use('/api/books', apiRouter);
};
