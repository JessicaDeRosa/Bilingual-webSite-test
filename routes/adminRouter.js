const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const faceBookStrategy = require('passport-facebook').Strategy;
const indexController = require('../controllers/indexControllers');
// body parser set up
router.use(bodyParser.urlencoded({ extended: true }));
//Passport setup
router.use(passport.initialize());
router.use(passport.session());

//serialize and deserialize : Passport
passport.serializeUser(function (user, cb) {
    cb(null, user);
})
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
})

//post routes 


module.exports = router;