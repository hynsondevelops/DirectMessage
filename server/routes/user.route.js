const express = require('express');
const router = express.Router();

import validate from 'express-validation';

import userValidation from '../validations/user.validations'
const user_controller = require('../controllers/user.controller');

import * as userController from '../controllers/user.controller'

import { authLocal } from '../services/auth.services'

router.post('/register', validate(userValidation.loginUser), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/show/:query', user_controller.showUser)
router.post('/add_friend', userController.addFriend)
router.get('/get_friends/:user_id', userController.getFriends)
module.exports = router;