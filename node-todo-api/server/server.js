require('./env');

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {config} = require('./config');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = config.port;

app.use(bodyParser.json());

/**** Todo routes ****/
app.post('/todos', authenticate, (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
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

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  })
    .then(todos => {
      res.send({todos});
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
  Todo.findOne({_id: req.params.id, _creator: req.user._id})
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

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send();
    }

    const todo = await Todo.findOneAndRemove({
      _id: req.params.id,
      _creator: req.user._id,
    });
    if (!todo) {
      return res.status(404).send({error: 'Todo not found!'});
    }
    res.json(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {_id: id, _creator: req.user._id},
    {$set: body},
    {new: true},
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch(err => {
      res.status(400).send();
    });
});
/**** Todo routes ****/

/**** User routes ****/
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);

    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users/profile', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);

    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send();
  }
});

app.delete('/users/logout', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});
/**** User routes ****/

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
}

module.exports = {app};
module.exports = {app};
