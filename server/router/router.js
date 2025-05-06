const express = require('express');
const router = express.Router();
const { handleError } = require('../utils/errorHandler');
const usersRestController = require('../routes/users/routes/usersRestController');
const authRestController = require('../routes/auth/routes/authRestController');

router.use('/auth', authRestController);
router.use('/users', usersRestController);

router.use((req, res, next) => {
    handleError(res, 404, 'Error 404: Page not found.')
});

module.exports = router;
