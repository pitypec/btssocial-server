import Post from '../models/post.js';
import Post from '../models/comments.js';

export const getAllPosts = async (req, res, next) => {
  const posts = await Post.find({}).populate('comment');
  return res.json(200).json({
    confirmation: 'success',
    posts
  });
};

export const createPost = async (req, res, next) => {
  const data = req.body;

  const newPost = new Post(data);
  const post = await newPost.save();
  if (post) {
    return res.status(201).json({ msg: 'post created sucessfully' });
  } else {
    return res.status(400).json({ msg: 'please try again' });
  }
};

export const getPost = async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  return res.status(200).json({
    confirmation: 'success',
    post
  });
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  const deletedPost = await Post.findByIdAndRemove(postId);

  return res.status(204).json({
    confirmation: 'Post deleted successfully'
  });
};

export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const query = req.body;

  const updatedPost = await Post.findByIdAndUpdate(postId, query, {
    new: true
  });
  if (updatedPost == null) {
    return res.status(400).json({
      confirmation: 'fail',
      error: 'user does not exist'
    });
  }

  return (
    res,
    status(200).json({
      confirmation: 'success',
      msg: 'edited successfully',
      updatedPost
    })
  );
};

export const getPostComments = (req, res, next) => {
    const {postId} = req.params;

    const post = await Post.findById(postId).populate('comment');

    return res.status(200).json(post.comments)
};

export const newPostComment = async (req, res, next) => {
  const { postId } = req.params;

  const newComment = new Comment(req.body);

  const post = await Post.findById(postId);

  newComment.postId = post;

  await newComment.save();

  post.Comment.push(newComment);

  await post.save();
  return res.status(201).json(newComment);
};
