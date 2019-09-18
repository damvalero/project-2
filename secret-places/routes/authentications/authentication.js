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
  successRedirect: "/home",
  failureRedirect: "/signup"
}));

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: "/home",
  failureRedirect: "/login"
}));

router.get('/home', routeGuardMiddleware, (req, res, next) => {
  res.render('home', {API_KEY: process.env.API_KEY});
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

