const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB');

  const db = client.db('TodoApp');

  // db
  //   .collection('Todos')
  //   .deleteOne({text: 'Eat lunch'})
  //   .then(
  //     result => {
  //       console.log(result);
  //     },
  //     err => {
  //       console.log('ERROR, ', err);
  //     },
  //   );

  // db
  //   .collection('Todos')
  //   .findOneAndDelete({completed: false})
  //   .then(
  //     result => {
  //       console.log(result);
  //     },
  //     err => {
  //       console.log('ERROR, ', err);
  //     },
  //   );

  db
    .collection('Users')
    .deleteMany({name: 'George'})
    .then(
      res => {
        console.log(res);
      },
      err => {
        console.log('ERROR, ', err);
      },
    );

  db
    .collection('Users')
    .findOneAndDelete({_id: ObjectID('5a946f9c1385659e1fb385d7')})
    .then(res => {
      console.log(res);
    });

  // client.close();
});
