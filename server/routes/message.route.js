const express = require('express');
const router = express.Router();

import validate from 'express-validation';

const message_controller = require('../controllers/message.controller');

import * as messageController from '../controllers/message.controller'


router.get('/show', message_controller.getMessage);
router.post('/new', message_controller.createMessage);
router.get('/new', message_controller.newMessage);


module.exports = router;