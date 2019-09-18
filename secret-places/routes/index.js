'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('home', {API_KEY: process.env.API_KEY});
});

module.exports = router;
