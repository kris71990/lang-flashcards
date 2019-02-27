'use strict';

const Word = (sequelize, DataTypes) => sequelize.define('word', {
  wordId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  wordLocal: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  wordEnglish: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  typeOfWord: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  variations: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
    unique: false,
  },
  sentences: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
    unique: false,
  },
});

export default Word;
