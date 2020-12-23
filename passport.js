import passport from 'passport';
import jwt from 'passport-jwt';
import passportjwt from 'passport-jwt';
import Local from 'passport-local';
import googlePlusTokenStrategy from 'passport-google-plus-token';
import facebookTokenStrategy from 'passport-facebook-token';
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
  'googleToken',
  new googlePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

passport.use(
  'facebookToken',
  new facebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ 'facebook.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
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
        const user = await User.findOne({ 'local.email': email });

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
