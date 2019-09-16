'use strict'

const express = require("express");
const route = express.Router();
const passport = require("passport");
// User model
const User = require("../../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

route.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

route.post("/sign-up", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("sign-up", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ email })
  .then(user => {
    if (user !== null) {
      res.render("sign-up", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("sign-up", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

route.get("/authentication/login", (req, res, next) => {
  res.render("auth/login");
});

route.post("/authentication/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

module.exports = route;
