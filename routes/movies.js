const router = require('express').Router();
const { movieIdValidators, movieValidators } = require('../utils/validators');

const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');

router.get('/movies', getMovies);
router.delete('/movies/:movieId', movieIdValidators, deleteMovie);
router.post('/movies', movieValidators, createMovie);

module.exports = router;
