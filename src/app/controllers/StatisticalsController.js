const Order=require('../models/Order')
const Product=require('../models/Product')
const Orderdetail=require('../models/Orderdetail')
class StatisticalsController {
    turnover(req,res)
    {
        var day=0;
        var month=0;
        var year=0;
        var status=req.query.t;
        if(status==1)
        {
            day=1;
        }
        if(status==2)
        {
            month=1;
        }
        if(status==3)
        {
            year=1;
        }
        if(status==4)
        {
            month=3;
        }
        var today = new Date();
        var nday = today.getDate()-day;
        var nmonth=today.getMonth()-month;
        var nyear=today.getFullYear()-year;
        Order.find({})
        .lean()
        .then((orders)=>{
            for(let i=0;i<orders.length;i++)
            {
                var ndate=orders[i]._book;
                if(ndate.getDate()+ndate.getMonth()*32+ndate.getFullYear()*367>=nday+nmonth*32+nyear*367)
                {
                    console.log(1);
                    console.log(orders[i]);
                }
            }
        });
        var status=req.query.t;
        console.log(status);
    }
    product(req,res)
    {
        var statistical=[];
        Product.find({})
            .lean()
        .then((products)=>{
            for(let i=0;i<products.length;i++)
            {
               var data={};
                Orderdetail.find({_idproduct:products[i]._id})
                .lean()
                .then(details=>{
                    var result=0;
                    for(let j=0;j<details.length;j++)
                    {
                        result=result+details[j]._amount;
                    }
                    data={
                        name:products[i]._name,
                        procedure:products[i]._procedure,
                        price:products[i]._price,
                        turnover:products[i]._price*result,
                        amount:result,
                    }
                    statistical.push(data);
                    if(i==products.length-1)
                    {
                        var h=1
                        statistical.push(h);
                        res.render('statisticals/product',{statistical:statistical.sort(function(a, b){return a.amount - b.amount}).slice(-11,-1).reverse()})
                    }
                })
            }
        
        })
    }
}
module.exports = new StatisticalsController();