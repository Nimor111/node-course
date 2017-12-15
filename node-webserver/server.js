const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'George',
    likes: ['Cats', 'Evi'],
  });
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error handling request!',
  });
});

app.listen(3000, () => {
  console.log('Server up on port 3000');
});
