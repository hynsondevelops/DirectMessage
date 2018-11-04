const express = require('express');
const router = express.Router();

import validate from 'express-validation';

const conversation_controller = require('../controllers/conversation.controller');

import * as conversationController from '../controllers/conversation.controller'

router.get('/show', conversation_controller.getConversation);
router.post('/new', conversation_controller.createConversation);
router.get('/new', conversation_controller.newConversation);

module.exports = router;