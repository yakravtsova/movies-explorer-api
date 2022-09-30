const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { signUpValidators, signInValidators } = require('../utils/validators');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signup', signUpValidators, createUser);
router.post('/signin', signInValidators, loginUser);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('/', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
