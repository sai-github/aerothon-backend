const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	userFirstName: {
		type: String,
		required: true
	},
	userSecondName: {
		type: String,
		required: true
	},
	registrationDate: {
		type: Date,
		default: Date.Now
	},
	phoneNumber: {
		type: Number,
		required: true
	},
	
})

module.exports = mongoose.model('User', UserSchema);