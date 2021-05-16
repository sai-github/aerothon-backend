const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// allow cors
app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const userRoute = require('./routes/users');

// Middlewares
app.use('/users', userRoute);

// Routes
app.get('/', (req, res) =>{
	res.send('Welcome to Aerothon 3.0');
});

app.get('/home', (req, res) =>{
	res.send('We are at home');
});

// Connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true },
	() => console.log('connected to mongodb')
);

// Listen
app.listen(process.env.PORT);