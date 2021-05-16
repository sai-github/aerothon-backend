const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const {registerValidation, loginValidation} = require('../Validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

	// validate data before adding
	const {error} = registerValidation(req.body);

	if(error){
		return res.status(400).send(error.details[0].message);
	}

	// Check if user already exist
	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist){
		return res.status(400).send("User already registered with given email");
	}

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		userFirstName: req.body.userFirstName,
		userSecondName: req.body.userSecondName,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		password: hashedPassword
	});

	try{
		const userRegistered = await user.save();
		res.send(userRegistered);
	}
	catch{
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {

	// validate data before adding
	const {error} = loginValidation(req.body);

	if(error){
		return res.status(400).send(error.details[0].message);
	}

	// Check if email exist
	const user = await User.findOne({email: req.body.email});
	if(!user){
		return res.status(400).send("Email not found");
	}

	// Check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass){
		return res.status(400).send("Password is wrong");
	}

	res.status(200).send(user);
});

module.exports = router;