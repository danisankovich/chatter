var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

tokenForUser = (user) => {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password Must Be Provided'});
  }

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
      var newUser = new User({
        email: email,
        password: password,
        username: username
      });
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

exports.signin = function(req, res, next) {
  const token = tokenForUser(req.user);
  if(token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      User.findById(decoded.sub, (err, user) => {
        res.send({user, token})
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
exports.getUser = (req, res) => {
  var token = req.headers.authorization;
  var user;
  if(token) {
    try {
      var decoded = jwt.decode(token, config.secret);
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
