const Product=require('../models/Product')
const { mongooseToObject } = require('../../util/mongoose');
class BoothsController {
    show(req,res){
        if(req.session.admin){
        var procedure=req.query.p;
        Product.find({_procedure:procedure})
        .lean()
        .then((products)=>{
            res.render('booths/show',{products,
            admin:req.session.admin,})
        })
    }
    else
    {
        res.redirect("/accounts/login");
    }
    }
    edit(req,res){
        if(req.session.admin)
        {
        Product.findById(req.params.id)
        .then((product) =>{
            if(product._booth==true)
            {
                var display=1;
            res.render('booths/update', {
                product: mongooseToObject(product),display,
                admin:req.session.admin,
            })
        }
        else{
            var notdisplay=1;
            res.render('booths/update', {
                admin:req.session.admin,
                product: mongooseToObject(product),notdisplay
            })
        }
    })}
    else{
        res.redirect("/accounts/login");
    }
    }
    save(req,res){
        Product.findById(req.params.id)
        .then((product) =>{
            if(product._booth==true)
            {
                product._booth=false;
            }
            else
            {
                product._booth=true;
            }
            Product.updateOne({ _id: product._id }, product)
            .then(()=>res.redirect("/booths?p="+product._procedure))
                      
             })
    }
}
module.exports = new BoothsController();