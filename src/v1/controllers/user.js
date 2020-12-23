import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import dotenv from 'dotenv';

dotenv.config();

const signToken = (user) => {
  return jwt.sign(
    {
      iss: 'btssocial',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    process.env.JWT_SECRET
  );
};

export const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json(users);
};

export const signUp = async (req, res, next) => {
  const { email, password } = req.value.body;

  const foundUser = await User.findOne({ 'local.email': email });

  if (foundUser) {
    return res.json(403).json({ error: 'Email already in use ' });
  }
  const newUser = new User({
    method: 'local',
    local: {
      email,
      password
    }
  });

  await newUser.save();

  const token = signToken(newUser);
  return res.status(201).json({ token });
};

export const signIn = async (req, res, next) => {
  const token = signToken(req.user);
  return res.status(200).json({ token });
};

export const googleOauth = async (req, res, next) => {
  const token = signToken(req.user);
  return res.status(200).json({ token });
};

export const facebookOauth = async (req, res, next) => {
  const token = signToken(req.user);
  return res.status(200).json({ token });
};

export const getUser = async (req, res, next) => {
  const { userId } = req.value.params;

  const user = await User.findById(userId);

  return res.status(400).json({
    confirmation: 'success',
    user
  });
};

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { password } = req.body;

  const user = await User.findByIdAndUpdate(userId, query, { new: true });

  return res.status(400).json({
    confirmation: 'sucess',
    user
  });
};
export const getProfile = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  console.log(user);
  const profile = await user.profile;

  if (profile == null) {
    return res.status(400).json({
      msg: 'no profile found'
    });
  }

  return res.status(200).json({
    confirmation: 'success',
    profile
  });
};

export const createProfile = async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;
  const user = await User.findById(userId);
  if (user == null) {
    return res.status(400).json({
      msg: 'user does not exist'
    });
  }
  user.profile = data;
  user.save();
  console.log(user);

  return res.status(200).json({
    confirmation: 'sucess',
    user
  });
};

export const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    $set: { profile: data }
  });
  concole.log(user.profile.id(_id));
  user.save();
  return res.status(200).json({
    confirmation: 'success',
    user
  });
};
