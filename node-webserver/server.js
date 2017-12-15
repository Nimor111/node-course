const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my first express web app!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error handling request!',
  });
});

app.listen(3000, () => {
  console.log('Server up on port 3000');
});
