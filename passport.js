import passport from 'passport';
import jwt from 'passport-jwt';
import passportjwt from 'passport-jwt';
import Local from 'passport-local';
import dotenv from 'dotenv';
import User from './src/v1/models/user.js';

dotenv.config();

const jwtStrategy = jwt.Strategy;
const LocalStrategy = Local.Strategy;

const { ExtractJwt } = passportjwt;

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findByID(payload.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
