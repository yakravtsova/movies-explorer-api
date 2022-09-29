const router = require('express').Router();
const { userDataValidators } = require('../utils/validators');

const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', userDataValidators, updateUser);

module.exports = router;
