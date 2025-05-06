require('dotenv').config();
const express = require('express');
const { handleError } = require('../../../utils/errorHandler');
const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'admin'
        };
        return res.status(201).send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;