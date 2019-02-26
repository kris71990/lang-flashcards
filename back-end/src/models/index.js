'use strict';

import Sequelize from 'sequelize';

const db = {};

const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
