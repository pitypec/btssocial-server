import express from 'express';
import expressRouter from 'express-promise-router';
import passport from 'passport';
import passportconf from '../../../passport.js';

import {
  getAllComments,
  createComment,
  getComment,
  deleteComment,
  likeComment
} from '../controllers/comments';

const router = express.Router();
/*
/comments
/comments/:id

*/
router.route('/').get(getAllComments).post(createComment);

router.route('/:commentId').get(getComment).delete(deleteComment);
router.route('/:commentId/like').patch(likeComment);
