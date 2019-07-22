'use strict';

import Sequelize from 'sequelize';

const db = {};

const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

const account = sequelize.import('./account.js');
const language = sequelize.import('./language.js');
const word = sequelize.import('./word.js');

language.hasMany(word, { foreignKey: 'languageId' });

db[account.name] = account;
db[language.name] = language;
db[word.name] = word;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
