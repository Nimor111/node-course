const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({})

Todo.remove({}).then(result => {
  console.log(result);
});

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('asdf')
  .then(todo => {
    console.log(todo);
  })
  .catch(err => {
    console.log(err);
  });
