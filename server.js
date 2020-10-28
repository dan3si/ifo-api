const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

const FrontendURL = 'http://iforchestra.com';

app.get('/translates/en', (req, res) => {
  res.set('Access-Control-Allow-Origin', FrontendURL);
  res.send(fs.readFileSync('./translates/en.json'));
});

app.get('/translates/ua', (req, res) => {
  res.set('Access-Control-Allow-Origin', FrontendURL);
  res.send(fs.readFileSync('./translates/ua.json'));
});

app.get('/person_images/oles_yasko.jpg', (req, res) => {
  res.set('Access-Control-Allow-Origin', FrontendURL);
  res.send(fs.readFileSync('./person_images/oles_yasko.jpg'));
});

app.get('/person_images/victoria_zhadko.jpg', (req, res) => {
  res.set('Access-Control-Allow-Origin', FrontendURL);
  res.send(fs.readFileSync('./person_images/victoria_zhadko.jpg'));
});

app.get('/person_images/dmytro_tavanets.jpg', (req, res) => {
  res.set('Access-Control-Allow-Origin', FrontendURL);
  res.send(fs.readFileSync('./person_images/dmytro_tavanets.jpg'));
});

app.listen(port, () => console.log('listening'));
