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

app.delete('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }

  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({error: 'Todo not found!'});
      }
      res.json(todo);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
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
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => res.status(400).send(err));
});

app.get('/users/profile', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user
        .generateAuthToken()
        .then(token => res.header('x-auth', token).send(user));
    })
    .catch(err => res.status(400).send());
});

app.delete('/users/logout', authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => res.status(400).send());
});
/**** User routes ****/

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
}

module.exports = {app};
module.exports = {app};
