const Order=require('../models/Order')
const { mongooseToObject } = require('../../util/mongoose');
const Customer=require('../models/Customer')
const PAGE_SIZE=4
class OrdersController {
    show(req, res) {
        if(req.session.admin)
        {
            var page=req.query.p;
            var input=[]
            var pages=[]
            var sta=req.query.s;
                var delivered=1;
                var els=1;
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
                            if(sta=='delivered'){
                            data={
                                id:orders[i]._id,
                                name:customers[j]._name,
                                address:orders[i]._address,
                                status:orders[i]._status,
                                date:orders[i]._delivery,
                                total:orders[i]._total,
                                phone:orders[i]._phonenumber,
                                note:orders[i]._note,
                                status:req.query.s
                            };
                        }
                        else
                        {
                            data={
                                id:orders[i]._id,
                                name:customers[j]._name,
                                address:orders[i]._address,
                                status:orders[i]._status,
                                date:orders[i]._book,
                                total:orders[i]._total,
                                phone:orders[i]._phonenumber,
                                note:orders[i]._note,
                                status:req.query.s
                            };
                        }
                            input.push(data);
                            break;
                        }
                        }
                    }
                    console.log(input);
                    console.log(pages);
                    input=input.slice((page-1)*PAGE_SIZE,(page)*PAGE_SIZE)
                    if(sta=='delivered'){
                    res.render('orders/show',{
                        admin:req.session.admin,
                        input,
                        pages,
                            delivered,
                    })
                }
                else{
                    res.render('orders/show',{
                        admin:req.session.admin,
                        input,
                        pages,
                        els,
                    })
                }
                }
            )})
            }
            else
            {
                res.redirect("/accounts/login");
            }
    }
    update(req,res)
    {
        if(req.session.admin){
        console.log(req.query.s);
        Order.findById(req.params.id)
        .then(order=>{
        if(order._status='not')
        {
            order._status='delivering'; Order.updateOne({ _id: req.params.id }, order)
            .then(() => res.redirect('/orders/show?s='+req.query.s+'&p=1'));
            return;
        }
            if(order._status=='delivering')
            {
                order._status='delivered';
                var today = new Date();
                order._delivery=today;
                Order.updateOne({ _id: req.params.id }, order)
                .then(() => res.redirect('/orders/show?s='+req.query.s+'&p=1'))
            }
       
    })
}
else
{
    res.redirect("/accounts/login");
}
    }
}
module.exports = new OrdersController();