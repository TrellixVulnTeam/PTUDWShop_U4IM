const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = new Schema({
     _username: { type: String,require:true},
     _password: { type: String,require:true},
     _name: { type: String,require:true},
     _address: { type: String,require:true},
     _email: { type: String,require:true},
     _avatar: { type: String,require:true},
     _lock: { type: Boolean,require:true},
})
module.exports=mongoose.model('Customer',Customer);
