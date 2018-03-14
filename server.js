'use strict';

const express = require('express');
const cors = require('cors');
// const pg = require('pg');
const bodyparser = require('body-parser').urlencoded({extended: true});
// const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;
// const CLIENT_URL = process.env.CLIENT_URL;
// const DATABASE_URL = 'postgres://localhost:5432/flashcards';

app.use(express.static('./public'));
app.use(cors());

// const client = new pg.Client(DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

app.get('/', (req, res) => res.send('hello world'));
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));