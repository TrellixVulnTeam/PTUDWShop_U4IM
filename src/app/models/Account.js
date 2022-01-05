const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = new Schema({
     _username: { type: String,require:true},
     _password: { type: String,require:true},
     _permission:{type:Boolean},
     _iduser: { type: String},  
})
module.exports=mongoose.model('Account',Account);
