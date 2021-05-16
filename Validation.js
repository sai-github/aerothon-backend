// Validation
const Joi = require('@hapi/joi');

// register validation
const registerValidation = (data) => {
	const schema = Joi.object({
		userFirstName: Joi.string(),
		userSecondName: Joi.string(),
		email: Joi.string()
		.min(6)
		.required()
		.email(),
		password: Joi.string()
		.min(6)
		.required(),
		phoneNumber: Joi.string().
		length(10)
		.pattern(/^\d+$/).
		required()
	});

	return schema.validate(data);
}

// login validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string()
		.min(6)
		.required()
		.email(),
		password: Joi.string()
		.min(6)
		.required()
	});

	return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
