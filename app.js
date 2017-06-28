
const models = require('./models');
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/', function(req, res) {

  models.Todo.findAll().then(function(todos) {
    res.render('index', {todos});
  });
});

app.listen(3000);
