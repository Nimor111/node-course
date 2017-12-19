const express = require('express');

const app = express();

const users = [
  {name: 'Ivan', age: 25},
  {name: 'George', age: 21},
  {name: 'Evi', age: 21},
];

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'TODO app v1.0',
  });
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(3000);

module.exports = {
  app,
};
