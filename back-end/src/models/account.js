'use strict';

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import HttpError from 'http-errors';

const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128;

export default (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    tokenSeed: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      unique: true,
    },
  });

  Account.prototype.generateToken = function () { // eslint-disable-line
    return this.update({ tokenSeed: crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex') })
      .then((account) => {
        return jsonWebToken.sign({
          tokenSeed: account.tokenSeed,
        }, process.env.ACCOUNT_SECRET);
      })
      .catch(() => new HttpError(401, 'Error creating token'));
  };
  
  Account.prototype.verifyPassword = function (password) { // eslint-disable-line
    return bcrypt.compare(password, this.passwordHash)
      .then((result) => {
        if (!result) {
          throw new HttpError(400, 'AUTH - incorrect password');
        }
        return this;
      });
  };
  
  Account.createAccount = function (username, email, password) { // eslint-disable-line
    return bcrypt.hash(password, HASH_ROUNDS)
      .then((passwordHash) => {
        password = null; //eslint-disable-line
        const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
        return Account.create({
          username,
          email,
          passwordHash,
          tokenSeed,
        });
      });
  };
  return Account;
};
