const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const dotenv = require("dotenv");
const express = require("express");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
dotenv.config();

const User = require("./models/user");

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy((userName, password, done) => {
    User.findOne({ userName: userName }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
