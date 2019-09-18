'use strict';

require("dotenv").config();
const { Router } = require('express');
const router = Router();
const passport = require('passport');
const routeGuardMiddleware = require('../../controllers/route-guard-middleware');
const Places = require('../../models/places');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: "/private",
  failureRedirect: "/signup"
}));

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: "/private",
  failureRedirect: "/login"
}));

router.get('/private', routeGuardMiddleware, (req, res, next) => {
  res.render('private', {API_KEY: process.env.API_KEY});
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

