const { celebrate, Joi } = require('celebrate');

const signUpValidators = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const signInValidators = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userDataValidators = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const movieIdValidators = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const movieValidators = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/).required(),
    trailerLink: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/).required(),
    thumbnail: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-zA-Z]{1,4}[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{1,}/).required(),
    owner: Joi.string().alphanum().length(24).required(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  signUpValidators,
  signInValidators,
  userDataValidators,
  movieIdValidators,
  movieValidators,
};
