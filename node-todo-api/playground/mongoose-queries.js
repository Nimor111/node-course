const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const id = '5a95dd561828b233defed4dd';

// if (!ObjectID.isValid(id)) {
//   console.log('ID NOT VALID');
// }

// Todo.find({
//   _id: id,
// }).then(todos => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id,
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) return console.log('Id not found.');
//     console.log('Todo by id', todo);
//   })
//   .catch(err => console.log(e));

const user_id = '5a94826af20bdd5e723c3d38';

User.findById(user_id)
  .then(user => {
    if (!user) {
      return console.log('User not found');
    }

    console.log('User is: ', user);
  })
  .catch(err => console.log(err));
