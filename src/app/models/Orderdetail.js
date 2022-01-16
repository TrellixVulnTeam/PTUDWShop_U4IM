const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Orderdetail = new Schema({
     _idorder: { type: String,require:true},
     _idproduct: { type: String,require:true},
     _amount:{ type: Number, default: 0 }
})
module.exports=mongoose.model('Orderdetail',Orderdetail);
