const express = require('express');
const router = express.Router();

import validate from 'express-validation';

import userValidation from '../validations/user.validations'
const user_controller = require('../controllers/user.controller');

import * as userController from '../controllers/user.controller'

import { authLocal } from '../services/auth.services'

router.get('/show', user_controller.getUser);
router.post('/new', user_controller.createUser);
router.get('/new', user_controller.newUser);
router.post('/register', validate(userValidation.loginUser), userController.registerUser);
router.get('/register', user_controller.newRegisterUser);
router.post('/login', authLocal, userController.loginUser);

module.exports = router;