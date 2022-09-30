require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const usersRouter = require('./routes/users');
// const moviesRouter = require('./routes/movies');
// const { NotFoundError } = require('./errors/NotFoundError');
// const { createUser, loginUser } = require('./controllers/users');
// const { signUpValidators, signInValidators } = require('./utils/validators');
// const auth = require('./middlewares/auth');
const { errorHandler } = require('./errors/errorHandler');
const { limiter } = require('./utils/limiter');
const { PORT, DB_PATH } = require('./utils/devConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

app.use(cors());

app.use(helmet());
app.use(limiter);

mongoose.connect(DB_PATH);

app.use(express.json());

app.use(requestLogger);

app.use(router);
/*
app.post('/signup', signUpValidators, createUser);
app.post('/signin', signInValidators, loginUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('/', () => {
  throw new NotFoundError('Страница не найдена');
}); */

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
