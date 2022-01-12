const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
     _iduser: { type: String,require:true},
    _status:{ type: String,require:true},
    _book:{type:Date},
    _delivery:{type:Date}
})
module.exports=mongoose.model('Order',Order);
