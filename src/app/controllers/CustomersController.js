const Customer=require('../models/Customer')


const PAGE_SIZE=4
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

                Product.countDocuments({}).then((total)=>{
                    var tongsoPage=Math.ceil(total/PAGE_SIZE)
                    var page_items=[]
                    for(let i=1;i<=tongsoPage;i++)
                    {
                        const item={
                            value:i,
                        }
                        page_items.push(item)
                    }
                    res.render('customers/show',{customers,page_items})           
                })
            })
            
        }
        else
        {
             res.redirect("/accounts/login");
        }
    }
}
module.exports = new CustomersController();