const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {config} = require('./config');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = config.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  newTodo.save().then(
    todo => {
      res.send(todo);
    },
    err => {
      res.status(400).send(err);
    },
  );
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({todos});
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({error: 'Todo not found!'});
      }
      res.send({todo});
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
}

module.exports = {app};
