
const models = require('./models');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")));

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
    assignedto: assignee}
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

app.post('/edit', function(req, res) {
  let item = req.body.item;
  let assignedto = req.body.assignedto;
  let idEdit = req.body.id;

  models.Todo.update(
    {
      item: item,
      assignedto: assignedto
    },
    {where: {id: idEdit}}
  ).then(function() {
    res.redirect('/');
  });
});

app.listen(3000);
