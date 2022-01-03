const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = new Schema({
    _idadmin: { type: String,require:true},  
     _username: { type: String,require:true},
     _password: { type: String,require:true},
})
module.exports=mongoose.model('Account',Account);
