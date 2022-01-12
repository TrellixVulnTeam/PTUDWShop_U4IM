const Order=require('../models/Order')
const { mongooseToObject } = require('../../util/mongoose');
const Customer=require('../models/Customer')

const PAGE_SIZE=6
class OrdersController {
    show(req, res) {
        var page =req.query.page
            page=parseInt(page)
            
            var status=req.query.s
            if(page<1 || !page)
                page=1
            Order.find({_status:status})
            .lean()
            .then(orders =>{ 
                var input=[];
                for(let i=0;i<orders.length;i++)
                {
                    var data=[];
                    Customer.findById(orders[i]._iduser)
                    .lean()
                    .then(customers=>{data.push(customers)})
                    data.push(orders[i]);
                    input.push[data]
                }
                res.render('orders/show',{
                admin:req.session.admin,
                input,
            })})
            
    }
}
module.exports = new OrdersController();