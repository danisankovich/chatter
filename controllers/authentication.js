'use strict';
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');

// All user/authentication based BE functions

// create token for user for authentication
const tokenForUser = (user) => {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password Must Be Provided'});
  }

  // if a user is already found with the supplied username or password, stop the signup, and notify the user
  User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
    if (err) return next(err);
    if (user) {
      if (user.email === req.body.email) {
        return res.status(422).send({error: 'Email Already In Use'});
      }

      if (user.username === req.body.username) {
        return res.status(422).send({error: 'Username Already In Use'});
      }
    } else {
      const newUser = new User({
        email: email,
        password: password,
        username: username
      });

      // encrypt the password
      bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }
        bcrypt.hash(newUser.password, salt, null, function(err, hash) {
          if (err) {return next(err); }
          newUser.password = hash;
          newUser.save((err) => {
            if (err) return next(err);
            res.json({user: newUser, token: tokenForUser(newUser)});
          });
        })
      })
    }
  })
}

// signin user based off the token.
exports.signin = function(req, res, next) {
  const token = tokenForUser(req.user);
  if(token) {
    try {
      //decod the token to get the user._id
      const decoded = jwt.decode(token, config.secret);

      User.findById(decoded.sub, (err, user) => {
        res.send({user, token});
      });
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}

exports.getUser = (req, res) => {
  const token = req.headers.authorization;
  let user;
  if(token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      User.findById(decoded.sub, (err, user) => {
        user = user
        res.send(user)
      })
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
