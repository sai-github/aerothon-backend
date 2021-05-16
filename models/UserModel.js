const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	userFirstName: {
		type: String,
		required: true,
	},
	userSecondName: {
		type: String,
		required: true,
	},
	registrationDate: {
		type: Date,
		default: Date.Now
	},
	phoneNumber: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	}
})

module.exports = mongoose.model('User', UserSchema);