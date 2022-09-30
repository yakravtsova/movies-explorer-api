const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, DEV_KEY } = require('../utils/devConfig');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).send({
      email: user.email, name: user.name, _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует!'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные для создания пользователя'));
      }
      return next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY, { expiresIn: '7d' });
      res
        .send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, loginUser, getCurrentUser, updateUser,
};
