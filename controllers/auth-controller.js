const async = require("async");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const User = require("../models/user");
const Message = require("../models/message");

exports.home = (req, res) => {
  Message.find().exec((err, msgList) => {
    if (err) {
      return next(err);
    }
    res.render("index", {
      user: req.user,
      msgList: msgList,
    });
  });
};

exports.signUp = (req, res, next) => {
  res.render("signup", {
    user: req.user,
    authType: "Sign up",
  });
};

exports.signUpPost = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    const user = new User({
      userName: req.body.userName,
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

exports.logIn = (req, res, next) => {
  res.render("login", {
    user: req.user,
    authType: "Log In",
  });
};

exports.logInPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })(req, res, next);
};

exports.logOut = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
