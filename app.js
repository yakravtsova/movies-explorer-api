require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorHandler } = require('./errors/errorHandler');
const { limiter } = require('./utils/limiter');

const { NODE_ENV, PROD_DB_PATH } = process.env;
const { PORT, DB_PATH } = require('./utils/devConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

app.use(cors());

mongoose.connect(NODE_ENV === 'production' ? PROD_DB_PATH : DB_PATH);

app.use(express.json());

app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use('/api', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
