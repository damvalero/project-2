'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('../models/places');
const User = require('../models/user');

router.get('/profile/:id', (req, res, next) => {
  const favoritesList = req.user._favorites
  Promise.all([
  User.findById(req.user._id).populate("_favorites"),
  Places.find({ addedBy: req.user.email})])
  .then(([user, places]) => {
    const data = {
      places: places,
      favorites: user._favorites
    }
    res.render('profile', data);
    })
  .catch(error => {
    console.log('Got an error updating',error)
  });
});

router.post('/addFavorite/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    $push: {_favorites: req.params.id}
  })
  .then(user => {
    console.log('this is', req.originalUrl)
    res.redirect('/profile/' + req.user._id);
    // res.redirect('/' + req.originalUrl);
    })
  .catch(error => {
    console.log('Got an error updating')
  });
});

module.exports = router;
