'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('../models/places');

router.get('/profile/:id', (req, res, next) => {
  Places.find({ addedBy: req.user.email})
  .then(places => {
    const data = {
      places: places
    }

    console.log(data);
    res.render('profile', data);
    })
  .catch(error => {
    console.log('Got an error updating')
  });
});

module.exports = router;
