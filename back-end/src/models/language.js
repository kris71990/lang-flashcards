'use strict';

const Language = (sequelize, DataTypes) => sequelize.define('language', {
  languageId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  languageName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  totalSpeakers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  family: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spokenIn: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
});

export default Language;
