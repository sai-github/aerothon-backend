const express = require('express');

const router = express.Router();

/* GET home page : server alive status [ping] */
router.get('/', (req, res) => {
  res.render('index', { title: 'Chmod-777 : Hacking World!' });
});

router.get('/ping', (req, res) => {
  res.render('index', { title: 'Chmod-777 : Hacking World!' });
});

module.exports = router;
