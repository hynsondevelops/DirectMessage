import Joi from 'joi';

export default {
	loginUser: {
		body: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			name: Joi.string().required()
		}
	}
}