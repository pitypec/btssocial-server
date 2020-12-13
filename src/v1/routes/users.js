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
  createProfile
} from '../controllers/user.js';

const router = expressRouter();

/*
/users
/signin
/signup
/users/:id
/users/:id/profile

*/

router.route('/').get(index);

router.route('/signup').post(validateBody(authSchema), signUp);
router
  .route('/signin')
  .post(
    validateBody(signInSchema),
    passport.authenticate('local', { session: false }),
    signIn
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
