import express from 'express';
import expressRouter from 'express-promise-router';
import passport from 'passport';
import passportconf from '../../../passport.js';

import {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostComments,
  newPostComment
} from '../controllers/posts.js';

const router = express.Router();
/*
/posts
/posts/:id
/posts/:id/comment

*/
router.route('/').get(getAllPosts).post(createPost);
router.route('/:postId').get(getPost).patch(updatePost).delete(deletePost);
router.route('/:postId/commwnts').get(getPostComments).post(newPostComment);
