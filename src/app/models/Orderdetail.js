const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Orderdetail = new Schema({
     _idorder: { type: String,require:true},
    _idproduct: { type: String,require:true},
    _nameproduct:{type:String},
    _amount:{ type: Number, default: 0 },
    _total:{type:Number}
})
module.exports=mongoose.model('Orderdetail',Orderdetail);
