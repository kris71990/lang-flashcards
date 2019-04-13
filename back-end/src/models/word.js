'use strict';

const Word = (sequelize, DataTypes) => sequelize.define('word', {
  languageId: {
    type: DataTypes.UUID,
    unique: false,
    allowNull: false,
  },
  wordId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  wordLocal: {
    type: DataTypes.STRING,
    unique: false,
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
    allowNull: false,
  },
  typeOfWord: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
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
