const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: String,
    password: String,
    profil_pic:String,
    facebook_id: String,
    facebook_name: String

})
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;