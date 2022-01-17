const Order=require('../models/Order')
const { mongooseToObject } = require('../../util/mongoose');
const Customer=require('../models/Customer')
const PAGE_SIZE=4
class OrdersController {
    show(req, res) {
            var page=req.query.p;
            var input=[]
            var pages=[]
            Order.find({_status:req.query.s})
            .lean()
            .then(orders =>{ 
                    Customer.find()
                    .then((customers)=>{
                    for(let i=0;i<orders.length;i++)
                    {
                        var data={};
                        if(i%PAGE_SIZE==0){
                        var p={page:Math.ceil((i+1)/PAGE_SIZE),status:req.query.s};pages.push(p);
                        }
                        
                        for(let j=0;j<customers.length;j++)
                        {
                        if(orders[i]._iduser==customers[j]._id)
                        {
                            data={
                                name:customers[j]._name,
                                address:orders[i]._address,
                                status:orders[i]._status,
                                book:orders[i]._book,
                                total:orders[i]._total,
                                phone:orders[i]._phonenumber,
                                note:orders[i]._note,
                            };
                            input.push(data);
                            break;
                        }
                        }
                    }
                    console.log(input);
                    console.log(pages);
                    input=input.slice((page-1)*PAGE_SIZE,(page)*PAGE_SIZE)
                    res.render('orders/show',{
                        admin:req.session.admin,
                        input,
                        pages,
                    })
                }
            )})
            
    }
}
module.exports = new OrdersController();