const express = require('express');
const goods = require('./goods.json');
const apiRouter = express.Router();
const app = express();
app.use('/api', apiRouter);

module.exports = {
  devServer: {
    before(app) {
      app.get('/api/goods', function(req, res) {
        res.json(goods);
      })
    }
  }
}