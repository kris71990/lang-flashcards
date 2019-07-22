'use strict';

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import HttpError from 'http-errors';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import logger from './logger';
import models from '../models/index';
// import passportAuth from '../config/passport';
import accountRouter from '../routes/account-router';
import languageRouter from '../routes/language-router';
import wordRouter from '../routes/word-router';
import errorMiddleware from './error-middleware';

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
let server = null;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy((username, password, done) => {
  return models.account.findOne({ where: { username } })
    .then((user) => {
      logger.log(logger.INFO, 'User Found');
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'invalid username or password' });
      }
      logger.log(logger.INFO, 'Password Authenticated - user logged in');
      return done(null, user);
    })
    .catch(done);
}));

passport.serializeUser((account, cb) => {
  return cb(null, account.id);
});

passport.deserializeUser((id, cb) => {
  models.account.findById(id, (err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
});

app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(session({ 
  secret: 'fnjdsinfjdsfn', 
  cookie: { maxAge: 9000000 }, 
  resave: false, 
  saveUninitialized: false, 
}));

app.use(accountRouter);
app.use(languageRouter);
app.use(wordRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found (catch-all)');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return models.sequelize
    .authenticate()
    .then(() => {
      logger.log(logger.INFO, 'Database connection established');

      return models.sequelize.sync({ logging: false })
        .then(() => {
          server = app.listen(process.env.PORT, () => {
            logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
          });
        })
        .catch(() => new HttpError(502, 'unable to start server'));
    })
    .catch((error) => {
      logger.log(logger.INFO, `ERROR - Database connection error: ${error}`);
      return new HttpError(502, 'Unable to start server');
    });    
};

const stopServer = () => {
  return models.sequelize.close()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server disconnected');
      });
    });
};

export { startServer, stopServer };
