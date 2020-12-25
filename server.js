const express = require('express');
const server = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

server.use('/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

server.get('/person_images/:name', (req, res) => {
  const image = fs.readFileSync(`./person_images/${req.params.name}.jpg`); 
  res.send(image);
});

server.get('/events', (req, res) => {
  const events = fs.readFileSync('./events/events.json');
  res.send(events);
});

server.get('/events/:event', (req, res) => {
  const events = JSON.parse(fs.readFileSync('./events/events.json'));
  const requestedEvent = events.find(ev => ev.id === req.params.event);

  res.send(JSON.stringify(requestedEvent));
});

server.get('/events/images/:eventID/:imageID', (req, res) => {
  const image = fs.readFileSync(`./events/images/${req.params.eventID}/${req.params.imageID}.jpg`);
  res.send(image);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
