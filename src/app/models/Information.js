const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Information = new Schema({
     _iduser: { type: String,require:true},
     _name: { type: String,require:true},
     _address: { type: String,require:true},
     _email: { type: String,require:true},
     _avatar: { type: String,require:true},
})
module.exports=mongoose.model('Information',Information);