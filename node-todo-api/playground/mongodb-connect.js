const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({text: 'This is a todo.'}, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert document.', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 4));
  // });

  db
    .collection('Todos')
    .insertOne(
      {name: 'Walk dog', location: 'Kushtata na Ivankata', completed: false},
      (err, res) => {
        if (err) {
          return console.log('Unable to insert document.', err);
        }

        console.log(JSON.stringify(res.ops, undefined, 4));
      },
    );

  client.close();
});
