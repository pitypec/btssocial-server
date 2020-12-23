import express from 'express';
import expressRouter from 'express-promise-router';
import passport from 'passport';
import passportconf from '../../../passport.js';
import {
  validateBody,
  authSchema,
  signInSchema,
  idSchema,
  validateParam
} from '../utils/routeHelper.js';

import {
  index,
  signIn,
  signUp,
  getUser,
  updateUser,
  getProfile,
  updateProfile,
  createProfile,
  googleOauth,
  facebookOauth
} from '../controllers/user.js';

const router = expressRouter();

/*
/users
/signin
/signup
/users/:id
/users/:id/profile

*/

router
  .route('/')
  .get(passport.authenticate('local', { session: false }), index);

router.route('/signup').post(validateBody(authSchema), signUp);
router
  .route('/signin')
  .post(
    validateBody(signInSchema),
    passport.authenticate('local', { session: false }),
    signIn
  );
router
  .route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), googleOauth);
router
  .route('/oauth/facebook')
  .post(
    passport.authenticate('facebookToken', { session: false }),
    facebookOauth
  );
router
  .route('/:userId')
  .get(validateParam(idSchema, 'userId'), getUser)
  .patch(updateUser);
router
  .route('/:userId/profile')
  .get(getProfile)
  .post(createProfile)
  .patch(updateProfile);

export default router;
