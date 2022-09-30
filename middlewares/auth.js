const jwt = require('jsonwebtoken');

const { DEV_KEY } = require('../utils/devConfig');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
