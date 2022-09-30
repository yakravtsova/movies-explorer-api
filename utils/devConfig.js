const PORT = 3001;
const DB_PATH = 'mongodb://localhost:27017/beatfilmsdb';
const DEV_KEY = 'verysecretjwtkey';
const SALT_ROUNDS = 10;

module.exports = {
  PORT, DB_PATH, DEV_KEY, SALT_ROUNDS,
};
