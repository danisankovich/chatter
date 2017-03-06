const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const config = require('../config');
const jwt = require('jwt-simple');
const request = require('request');

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
