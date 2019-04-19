'use strict';

const Language = (sequelize, DataTypes) => sequelize.define('language', {
  languageId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  languageName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  wordCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transliteration: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  totalSpeakers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  family: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  spokenIn: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
});

export default Language;
