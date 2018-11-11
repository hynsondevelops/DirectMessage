//npm modules
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

//mongodb
const mongoose = require('mongoose')
const db = 'mongodb://localhost/ChatAppDB';


//cors
const cors = require('cors')

const user = require('./routes/user.route'); // Imports routes for the products
//const message = require('./routes/message.route')
import { authJwt } from './services/auth.services'


mongoose.connect(db)


// create the server
const app = express();

app.use(cors())

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize());


//ejs
app.set('view engine', 'ejs')

//user
app.use('/user', user)
//app.use('/message', message)
//app.use('/conversation', conversation)

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  res.render("login", {})
})

app.post('/login', (req, res, next) => {
  console.log("app.post('/login')")
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

app.get('/private', authJwt, (req, res) => {
  res.send("Private info!")
})

app.use(function(err, req, res, next){
  console.log(req.body)
  console.log("error handle")
  if (err.errors) {
    if (err.errors[0]) {
      console.log("HERE?")
      console.log(err.errors[0])
      if (err.errors[0].messages[0] == '"email" must be a valid email') {
        res.status(400).json(req.body.email + err.errors[0].messages[0].slice(7))
      }
      else {
        res.status(400).json(err.errors[0].messages);
      }
    }
    else {
      if (err.errors.email) {
        console.log("here")
        res.status(400).json(err.errors.email.message)
      }
    }
  }
  else {
    res.status(400).json(err)
  }
});


// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})

module.exports = app, passport