import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user.model';

const localOpts = {
  usernameField: 'email',
  passReqToCallback : true
};

const localStrategy = new LocalStrategy(localOpts, async (req, email, password, done) => {
  console.log("local strategy")
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User does not exist!' });
    } else if (!user.authenticateUser(password)) {
      return done(null, false, { message: 'Wrong password.' });
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// Jwt strategy
const jwtOpts = {
  jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SecretKey",
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const myPassport = passport;

export const authLocal = passport.authenticate('local', { session: false }, function(err, user, info) {
  console.log(info)
})
export const authJwt = passport.authenticate('jwt', { session: false });
