'use strict';

const Profile = (sequelize, DataTypes) => sequelize.define('profile', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  languages: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true,
  },
});

export default Profile;
