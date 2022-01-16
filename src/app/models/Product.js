const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
     _nameproduct: { type: String,require:true},
    _idcate:  { type: String, default: 'Chưa xác nhận' },
    _img:{ type: String, default: 'null' },
    _price:{ type: Number, default: 0 },
    _amount:{ type: Number, default: 0 },
    _procedure:{ type: String, default: 'Chưa xác nhận' },
    _detail:{ type: String, default: 'Không' },
    _slug:{type:String},
    _booth:{type:Boolean}
})
module.exports=mongoose.model('Product',Product);
