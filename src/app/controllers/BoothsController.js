const Product=require('../models/Product')
const { mongooseToObject } = require('../../util/mongoose');
class BoothsController {
    show(req,res){
        var procedure=req.query.p;
        Product.find({_procedure:procedure})
        .lean()
        .then((products)=>{
            res.render('booths/show',{products})
        })
    }
    edit(req,res){
        Product.findById(req.params.id)
        .then((product) =>{
            if(product._booth==true)
            {
                var display=1;
            res.render('booths/update', {
                product: mongooseToObject(product),display
            })
        }
        else{
            var notdisplay=1;
            res.render('booths/update', {
                product: mongooseToObject(product),notdisplay
            })
        }
    })
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