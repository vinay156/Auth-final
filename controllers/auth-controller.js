const async = require("async");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

//Model
const User = require("../models/user");

// Handle sign up page GET
exports.signUp = (req, res, next) => {
  res.render("signup", {
    user: req.user,
    authType: "Sign up",
  });
};

//Handle sign up POST
exports.signUpPost = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      status: "member",
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};

//Handle log in page GET
exports.logIn = (req, res, next) => {
  res.render("login", {
    user: req.user,
    authType: "Log In",
  });
};

//Handle log in page POST
exports.logInPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })(req, res, next);
};

//Handle log OUT page GET
exports.logOut = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
