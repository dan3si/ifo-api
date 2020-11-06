const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use('/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/translates/:lang', (req, res) => {
  res.send(fs.readFileSync(`./translates/${req.params.lang}.json`));
});

app.get('/person_images/:name', (req, res) => {
  res.send(fs.readFileSync(`./person_images/${req.params.name}.jpg`));
});

app.get('/events', (req, res) => {
  res.send(fs.readFileSync('./events/events.json'));
});

app.get('/events/:event', (req, res) => {
  const events = JSON.parse(fs.readFileSync('./events/events.json'));
  const requestedEvent = events.find(ev => ev.id === req.params.event);

  res.send(JSON.stringify(requestedEvent));
});

app.get('/events/images/:id', (req, res) => {
  res.send(fs.readFileSync(`./events/images/${req.params.id}.jpg`));
});

app.listen(port, () => console.log('listening'));
