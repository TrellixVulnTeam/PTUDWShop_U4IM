const Customer=require('../models/Customer')
const { mongooseToObject } = require('../../util/mongoose');

const PAGE_SIZE=6
class CustomersController {
    show(req, res) {
        if(req.session.admin)
        {
        var page =req.query.page
            page=parseInt(page)
            if(page<1 || !page)
                page=1
            var skipAmount=(page-1)*PAGE_SIZE
            Customer.find({})
            .skip(skipAmount)
            .limit(PAGE_SIZE)
            .lean()
            .then(customers=>{

                Customer.countDocuments({}).then((total)=>{
                    var tongsoPage=Math.ceil(total/PAGE_SIZE)
                    var page_items=[]
                    for(let i=1;i<=tongsoPage;i++)
                    {
                        const item={
                            value:i,
                        }
                        page_items.push(item)
                    }
                    res.render('customers/show',{admin:req.session.admin,customers,page_items})           
                })
            })
            
        }
        else
        {
             res.redirect("/accounts/login");
        }
    }
    detail(req, res,next) {
        if(req.session.admin)
        {
        var lock=true;
        var unlock=true;
        Customer.findById(req.params.id)
        .then((customer) =>{
            if(customer._lock==true)
            {
            res.render('customers/detail', {
                admin:req.session.admin,
                customer: mongooseToObject(customer),
                lock,
            })
            }
            else
            {
                res.render('customers/detail', {
                    admin:req.session.admin,
                    customer: mongooseToObject(customer),
                    unlock
                })
            }
    }
        )
        .catch(next);
    }
    else
    {
         res.redirect("/accounts/login");
    }   
    }
    status(req, res,next) {
        Customer.findById(req.params.id)
        .then((customer) =>{
            if(customer._lock==true)
            {
                customer._lock=false;
            }
            else
            {
                customer._lock=true;
            }
            Customer.updateOne({ _id: customer._id }, customer)
            .then(()=>res.redirect("/customers/show"))
                      
             })
        .catch(next);
    }
}
module.exports = new CustomersController();