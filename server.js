'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyparser = require('body-parser').urlencoded({extended: true});
// const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = 'http://localhost:3000';
const DATABASE_URL = 'postgres://localhost:5432/flashcards';

app.use(express.static('./public'));
app.use(cors());

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.get('/api/user', (req, res) => {
  client.query(`SELECT * FROM users`)
    .then(users => {
      let response = false;
      for (let i in users.rows) {
        if (users.rows[i].username === req.query.username &&
            users.rows[i].password === req.query.password) {
          response = true;
        }
      }
      res.send(response);
    });
});

app.get('/api/dutch/words', (req, res) => {
  client.query(`SELECT * FROM dutch;`)
    .then(words => res.send(words.rows))
    .catch(console.error);
});

app.get('/api/french/words', (req, res) => {
  client.query(`SELECT * FROM french;`)
    .then(words => res.send(words.rows))
    .catch(console.error);
});

app.get('/api/german/words', (req, res) => {
  client.query(`SELECT * FROM german;`)
    .then(words => res.send(words.rows))
    .catch(console.error);
});

// app.get('/', (req, res) => res.send('hello world'));
app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));