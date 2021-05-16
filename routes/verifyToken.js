const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function auth (req, res, next){
	const token = req.header('auth-token');
	if(!token)
		return res.status(401).send('Access Denied');

	try{
		const verify = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = "verified";
		next();
	}
	catch(err){
		console.log(err);
		return res.status(400).send('Invalid Token');
	}
}