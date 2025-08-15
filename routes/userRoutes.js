const express = require('express');

const router = express.Router();

const UserController = require('../controllers/userController');


router.get('/laptop', UserController.getLaptops);

module.exports = router;