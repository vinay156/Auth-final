//Model
const User = require('./models/user')

//Mongoose connect
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require("express-session");
const createError = require('http-errors');
const logger = require('morgan');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');


//EJS
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
            return done(null, user)
        } else {
            return done(null, false, {message: 'Incorrect password'})
        }
    })
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err,user) => {
      done(err, user)
  })
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'cats', resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

//Route
const indexRouter = require('./routes/index');
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
