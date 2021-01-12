const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const flash = require('connect-flash');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const PORT = process.env.PORT;
//conect Data base
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_LINK);
const bodyParser = require('body-parser');
// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// connect DB
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('DB connected') })
    .catch(err => console.log('DB not connected :' + err))

//setup a template engines
app.set('view engine', 'hbs');


//setup a static Folder
app.use(express.static(path.join(__dirname, 'public')));

//setup a session
app.use(session({
    secret: process.env.SESSION,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));

//flash
app.use(flash());

//multer
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOADS)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })
//partials
hbs.registerPartials(__dirname + '/views/partials/');

// importing routers
const indexRouter = require('./routes/index');
//const { contactMe } = require('./controllers/indexControllers');
const contactMe=require ('./routes/contactMe');
app.use('/',contactMe);
app.use('/',indexRouter);


//listen
app.listen(PORT, () => {
    console.log(`********************* Server is Running at http://localhost:${PORT} *********************`);
});