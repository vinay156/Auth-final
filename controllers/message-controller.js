const async = require("async");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const Message = require("../models/message");

exports.getMessage = (req, res) => {
  if (req.user) {
    res.render("create-message", { user: req.user });
  } else {
    res.redirect("/");
  }
};

exports.postMessage = (req, res, next) => {
  const timestamp = new Date();
  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    );
  }

  const msg = new Message({
    title: req.body.title,
    body: req.body.note,
    userName: req.user.userName,
    timestamp: formatDate(timestamp),
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
