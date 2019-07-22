import passport from 'passport';
import LocalStrategy from 'passport-local';
import logger from '../lib/logger';
import models from '../models';

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
