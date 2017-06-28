
const models = require('./models');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {

  models.Todo.findAll().then(function(todos) {
    res.render('index', {todos: todos});
  });
});

app.post('/', function(req, res) {
  let newItem = req.body.todo;
  let assignee = req.body.assignee;

  models.Todo.create(
    {item: newItem,
    assigned_to: assignee}
  ).then(function() {
    models.Todo.findAll().then(function(todos) {
      res.render('index', {todos: todos});
    });
  });
});

app.post('/complete', function(req, res) {
  let idcomplete = req.body.id;

  models.Todo.update(
    {completed_at: new Date()},
    {where: {id: idcomplete}}
  ).then(function() {
    models.Todo.findAll().then(function(todos) {
      res.redirect('/');
    });
  });
});

app.listen(3000);
