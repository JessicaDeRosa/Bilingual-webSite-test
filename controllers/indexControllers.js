const Admin = require('../model/Admin');
const fs = require('fs');
const url= require('url');
const { json } = require('body-parser');
const { fstat } = require('fs');

// show landing page
exports.landingPage = (req, res)=> {
    const queryObject = url.parse(req.url,true).query;
    let langFile="./public/js/english.json";
    if(queryObject && queryObject.lang){
        if(queryObject.lang=="de"){
     langFile = "./public/js/german.json";
          }
        if(queryObject.lang=="en"){
            langFile
        }  
    }
    console.log(queryObject.lang);
   
    
    console.log(langFile);
    fs.readFile(langFile, (err, data) => {
       
        let lang = JSON.parse(data);
        console.debug(lang);
        res.render('index',{lang: lang});
    });
    
}
//contact me page
exports.contactMe = (req, res)=> {
    res.render('contactMe');
}
//admin page
exports.adminCont = (req, res)=> {
    res.render('admin');
}
exports.adminlog = (req, res)=> {
    res.render('login',{msg: req.flash('success')});
}
exports.adminprof = (req, res) => {
    console.log(req.session.user)
    res.render('adminProfil', {
        msg: req.flash('success'),
        user: req.session.user
    });
}
exports.adLog=(req,res)=>{
    Admin.findOne(req.body,(err,user)=>{
        if(user){
         req.session.user=user;   
         req.flash('success','login done, welcome to your profile!')
         res.redirect('adProfil')
        }
        else{
            res.json('user not found')
        }

    })
}
// post from admin's page
