const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// get all users
router.get('/', (req, res) => {
	User.find()
	.then( data => {res.json(data)})
	.catch( err => {res.json({ message : err})});
	
	//res.send("get all users");
});

// add an user
router.post('/', (req, res) => {

	//console.log(req.body);

	const user = new User({
		userFirstName: req.body.userFirstName,
		userSecondName: req.body.userSecondName,
		phoneNumber: req.body.phoneNumber,
		//registrationDate: Date.now
	})

	user.save()
	.then( data => {res.json(data)})
	.catch( err => {res.json({ message : err})});

	//res.send("add user to db");
});

// get an user with id
router.get('/:userId', (req, res) => {
	//console.log(req.params.userId);

	User.findById(req.params.userId)
	.then( data => {res.json(data)})
	.catch( err => {res.json({ message : err})});

});

// delete an user
router.delete('/:userId', (req, res) => {
	//console.log(req.params.userId);

	User.deleteOne({_id: req.params.userId})
	.then( data => {res.json(data)})
	.catch( err => {res.json({ message : err})});

});

// update an user
router.patch('/:userId', (req, res) => {
	//console.log(req.params.userId);

	User.updateOne(
		{ _id: req.params.userId }, 
		{ $set: { userFirstName: req.body.userFirstName } }
	)
	.then( data => {res.json(data)})
	.catch( err => {res.json({ message : err})});

});



module.exports = router;
