var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');
var request = require('request');

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}); //token based, not session
const requireSignin = passport.authenticate('local', {session: false});
const authenticate = expressJwt({secret : config.secret});

const User = require('../models/user');

router.get('/api', requireAuth, Authentication.getUser);
router.post('/api/signup', Authentication.signup);
router.post('/api/signin', requireSignin, Authentication.signin);

module.exports = router;
