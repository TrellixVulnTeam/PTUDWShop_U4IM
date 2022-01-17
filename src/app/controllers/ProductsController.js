const Product=require('../models/Product')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { searchInMongoose } = require('../../util/mongoose');
const PAGE_SIZE=4
class ProductsController {

    add(req, res) {

        if(req.session.admin)
        {
        res.render('products/add',{admin:req.session.admin});
        }
        else
        {
                res.redirect("/accounts/login");
        }
    }
    store(req, res) {
        req.body._procedure=req.body._procedure.toLowerCase();
        req.body._idcate=req.body._idcate.toLowerCase();
        const product = new Product(req.body);
        product._slug=product._id;
        product._booth=true;
        product
            .save()
            .then(()=>res.redirect('/products/show')) 
    }
    delete(req, res,next) {
        Product.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }
    search(req, res,next) {
        if(req.session.admin)
        {
        var page =req.query.page
            page=parseInt(page)
            var page_items=[]
            var s_item=req.query.q
            if(page<1 || !page)
                page=1
            Product.find({})
            .lean()
            .then(products => res.render('products/search',{
                products: searchInMongoose(products,s_item,PAGE_SIZE,page,page_items),page_items,
            }))
            .catch(next)
        }
        else
        {
                res.redirect("/accounts/login");
        }
    }
    update(req, res,next) {
        if(req.session.admin)
        {
        Product.findById(req.params.id)
        .then((product) =>
            res.render('products/update', {
                product: mongooseToObject(product),
            }),
        )
        .catch(next);
        }
        else
        {
                res.redirect("/accounts/login");
        }
    }
    show(req, res,next) {
        if(req.session.admin)
        {
        var page =req.query.page
            page=parseInt(page)
            if(page<1 || !page)
                page=1
            var skipAmount=(page-1)*PAGE_SIZE
            Product.find({})
            .skip(skipAmount)
            .limit(PAGE_SIZE)
            .lean()
            .then(products=>{

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
                    console.log(products);
                    res.render('products/show',{products,page_items})           
                })
            })
            .catch(next)
        }
        else
        {
                res.redirect("/accounts/login");
        }
        }
    save(req, res, next) {
        req.body._procedure=req.body._procedure.toLowerCase();
        req.body._idcate=req.body._idcate.toLowerCase();
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/products/show'))
            .catch(next);
    }
}

module.exports = new ProductsController();