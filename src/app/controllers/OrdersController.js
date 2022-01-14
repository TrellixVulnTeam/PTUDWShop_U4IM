const Order=require('../models/Order')
const { mongooseToObject } = require('../../util/mongoose');
const Customer=require('../models/Customer')

const PAGE_SIZE=6
class OrdersController {
    show(req, res) {
            var status=req.query.s
            var input=[]
            Order.find({_status:status})
            .lean()
            .then(orders =>{ 
                    Customer.find()
                    .then((customers)=>{
                    for(let i=0;i<orders.length;i++)
                    {
                        var data={};
                        for(let j=0;j<customers.length;j++)
                        {
                        if(orders[i]._iduser==customers[j]._id)
                        {
                            data={
                                _name:customers[j]._name,
                                _address:customers[j]._address,
                                _status:orders[i]._status,
                                _book:orders[i]._book,
                            };
                            input.push(data);
                            break;
                        }
                        }
                    }
                    console.log(input);
                    res.render('orders/show',{
                        admin:req.session.admin,
                        input,
                    })
                }
            )})
            
    }
}
module.exports = new OrdersController();