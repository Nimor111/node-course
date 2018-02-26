const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB');

  const db = client.db('TodoApp');

  // db
  //   .collection('Todos')
  //   .findOneAndUpdate(
  //     {_id: ObjectID('5a946e391385659e1fb384df')},
  //     {$set: {text: 'Eat lunch'}},
  //     {returnOriginal: false},
  //   )
  //   .then(res => console.log(res));

  db
    .collection('Users')
    .findOneAndUpdate(
      {_id: ObjectID('5a946fa61385659e1fb385db')},
      {$set: {name: 'Zakusov'}, $inc: {age: 1}},
      {returnOriginal: false},
    )
    .then(res => console.log(res));

  // client.close();
});
