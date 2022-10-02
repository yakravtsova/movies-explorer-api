const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { BadRequestError } = require('../errors/BadRequestError');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для создания фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      const userId = req.user._id.toString();
      if (movieOwner !== userId) {
        throw new ForbiddenError('Вы можете удалять только свои фильмы');
      }
      return movie.remove();
    })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports = {
  createMovie, deleteMovie, getMovies,
};
