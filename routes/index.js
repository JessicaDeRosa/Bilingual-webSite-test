const express = require('express');
const router = express.Router();
const fs = require('fs');
const url= require('url');
const bodyParser = require('body-parser');
const passport = require('passport');
const faceBookStrategy = require('passport-facebook').Strategy;
const indexController = require('../controllers/indexControllers');
const sgMail = require('@sendgrid/mail');
const Admin = require('../model/Admin');
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
//facebook Strategy
// passport.use(new faceBookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: '/user/auth/facebook/return',
//     profile: ['id', 'displayName'] // we can define what is coming from facebook
// },
//     function (accessToken, refreshToken, profile, done) {
//         console.log(accessToken, refreshToken);
//         // first find in DB that u have a facebook user
//         Admin.findOne({ facebook_id: profile.id }, (err, user) => {
//             if (err) throw err.message;
//             if (user) {
//                 done(null, user);
//             }
//             else {
//                 newAdmin = new Admin({
//                     facebook_id: profile.id,
//                     facebook_name: profile.displayName
//                 });
//                 // save user
//                 newAdmin.save(err => {
//                     if (err) throw err;
//                     console.log('Facebook user has been created!')
//                     done(null, user);
//                 });
//             }
//         })
//     }
// ));
//get routes
router.get('/', indexController.landingPage);
//router.get('/contactMe',indexController.contactMe);
router.get('/adminPage', indexController.adminCont);
router.get('/adLogin',indexController.adminlog);
router.get('/adProfil',indexController.adminprof);
//post routes
router.post('/contactME', (req, res) => {
    console.log(req.body)
    //setting send email
    sgMail.setApiKey(process.env.SEND_API_KEY);
    const msg = {
        to: 'jessicaderosa24@gmail.com',
        from: 'jessicaderosa24@gmail.com',
        subject: req.body.Subject,
        html: `<span><strong>from:${req.body.Email}</strong></span>
               <p>${req.body.Message}</p>`
    };
    sgMail
        .send(msg).then(() => {
            req.flash('msg', 'thanks for contact me')
            res.redirect('/contactMe')
        })
})
router.post('/adminForm', (req, res) => {
    console.log(req.body)
    const newAdminData = new Admin(req.body);
    newAdminData.save(function(err,admin){
        if(err) return console.log('error');
        req.flash('success','your registration process is succesfully done!')
        res.redirect('adLogin')
    })
})
router.post('/adminLogin',indexController.adLog);
module.exports = router;