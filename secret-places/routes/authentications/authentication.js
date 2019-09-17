'use strict';

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const routeGuardMiddleware = require('../../controllers/route-guard-middleware');

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
  res.render('private');
});

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;



















// route.get("/signup", (req, res, next) => {
//   res.render("signup");
// });

// // route.post('/signup', (req, res, next) => {
// //   successRedirect: "/private",
// //   failureRedirect: "/"
// // });

// route.post('/signup', passport.authenticate('signup', {
//   successRedirect: "/private",
//   failureRedirect: "/"
//  }));

// route.get("/login", (req, res, next) => {
//   res.render("login");
// });

// route.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// route.get("/private", (req, res) => {
//   console.debug(req.user)
//   res.render("private", { user: req.user });
// });

// route.get("/logout", (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/login");
// });

// module.exports = route;
