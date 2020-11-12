const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');
const bodyParser = require('body-parser');
const multer  = require("multer");
const cors = require('cors');

const authTokens = [];

app.use(cors());

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

app.post('/events', bodyParser.text(), (req, res) => {
  let events = JSON.parse(fs.readFileSync('./events/events.json'));
  
  if (typeof req.body === 'string') {
    const id = String(Math.max(
      ...events.map(ev => +ev.id)
    ) + 1);
    const { title, description } = JSON.parse(req.body);

    events = [{ id, title, description}, ...events];
    fs.writeFileSync('./events/events.json', JSON.stringify(events));
  } else {
    const id = String(Math.max(
      ...events.map(ev => +ev.id)
    ));

    const upload = multer({
      storage: multer.diskStorage({
        destination: './events/images',
        filename: function(req, file, cb) {
          cb(null, id + '.jpg');
        },
      }),
    }).single('image');
  
    upload(req, res, (err) => {
      res.send('ok');
    })
  }
});

app.delete('/events/:event', bodyParser.text(), (req, res) => {
  if(!authTokens.includes(req.body)) {
    res.send('invalid');
    return;
  }

  const events = JSON.parse(fs.readFileSync('./events/events.json'));
  const filteredEvents = events.filter(ev => ev.id !== req.params.event);
  fs.writeFileSync('./events/events.json', JSON.stringify(filteredEvents));
  fs.unlinkSync(`./events/images/${req.params.event}.jpg`);
  res.send('success');
})

app.post('/auth', bodyParser.text(), (req, res) => {
  if (req.body === 'iforchestra') {
    let authToken = '';

    for (let i = 0; i < 60; i++) {
      const symbolCode = 65 + Math.floor(Math.random() * 26);
      authToken += String.fromCharCode(symbolCode);
    }

    authTokens.push(authToken)
    res.send(authToken);
  } else {
    res.send('invalid');
  }
});

app.post('/auth/check', bodyParser.text(), (req, res) => {
  if (authTokens.includes(req.body)) {
    res.send('valid');
  } else {
    res.send('invalid');
  }
});

app.listen(port, () => console.log('listening'));
