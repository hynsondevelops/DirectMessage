const express = require('express');
const router = express.Router();

import validate from 'express-validation';

const conversation_controller = require('../controllers/conversation.controller');

import * as conversationController from '../controllers/conversation.controller'

router.post('/create', conversation_controller.createConversation);
router.post('/add_user/:user_id/:conversation_id', conversation_controller.addUserToConversation);

module.exports = router;