const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.get('/translates/en', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://iforchestra.com');
  res.send(fs.readFileSync('./translates/en.json'));
});

app.get('/translates/ua', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://iforchestra.com');
  res.send(fs.readFileSync('./translates/ua.json'));
});

app.listen(port, () => console.log('listening'));
