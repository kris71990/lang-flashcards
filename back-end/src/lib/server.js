'use strict';

import express from 'express';
import cors from 'cors';
import HttpError from 'http-errors';

import logger from './logger';
import models from '../models/index';
import errorMiddleware from './error-middleware';

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
let server = null;

app.use(cors({ credentials: true, origin: CLIENT_URL }));

// import routers here

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

// app.get('/api/user', (req, res) => {
//   client.query(`SELECT * FROM users`)
//     .then(users => {
//       let response = false;
//       for (let i in users.rows) {
//         if (users.rows[i].username === req.query.username &&
//             users.rows[i].password === req.query.password) {
//           response = true;
//         }
//       }
//       res.send(response);
//     });
// });

// app.get('/api/dutch/words', (req, res) => {
//   client.query(`SELECT * FROM dutch;`)
//     .then(words => res.send(words.rows))
//     .catch(console.error);
// });

// app.get('/api/french/words', (req, res) => {
//   client.query(`SELECT * FROM french;`)
//     .then(words => res.send(words.rows))
//     .catch(console.error);
// });

// app.get('/api/german/words', (req, res) => {
//   client.query(`SELECT * FROM german;`)
//     .then(words => res.send(words.rows))
//     .catch(console.error);
// });
