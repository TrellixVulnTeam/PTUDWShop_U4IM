const Order=require('../models/Order')
const Product=require('../models/Product')
const Orderdetail=require('../models/Orderdetail')
const { convertDate } = require('../../util/mongoose');
class StatisticalsController {
    turnover(req,res)
    {
        if(req.session.admin){
        var time1={Date:new Date(),Turnover:0};
        var time2={Date:new Date(),Turnover:0};
        var time3={Date:new Date(),Turnover:0};
        var time4={Date:new Date(),Turnover:0};
        var time5={Date:new Date(),Turnover:0};
        var time6={Date:new Date(),Turnover:0};
        var time7={Date:new Date(),Turnover:0};
            time1.Date.setDate(time1.Date.getDate() - 6);
            time2.Date.setDate(time2.Date.getDate() - 5);
            time3.Date.setDate(time3.Date.getDate() - 4);
            time4.Date.setDate(time4.Date.getDate() - 3);
            time5.Date.setDate(time5.Date.getDate() - 2);
            time6.Date.setDate(time6.Date.getDate() - 1);
            time7.Date.setDate(time7.Date.getDate() - 0);
        Order.find({})
        .lean()
        .then((orders)=>{
            for(let i=0;i<orders.length;i++)
            {
                var ndate=orders[i]._book;
                if(ndate.getDate()==time1.Date.getDate()&&ndate.getMonth()==time1.Date.getMonth()&&ndate.getFullYear()==time1.Date.getFullYear())
                {
                    time1.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time2.Date.getDate()&&ndate.getMonth()==time2.Date.getMonth()&&ndate.getFullYear()==time2.Date.getFullYear())
                {
                    time2.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time3.Date.getDate()&&ndate.getMonth()==time3.Date.getMonth()&&ndate.getFullYear()==time3.Date.getFullYear())
                {
                    time3.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time4.Date.getDate()&&ndate.getMonth()==time4.Date.getMonth()&&ndate.getFullYear()==time4.Date.getFullYear())
                {
                    time4.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time5.Date.getDate()&&ndate.getMonth()==time5.Date.getMonth()&&ndate.getFullYear()==time5.Date.getFullYear())
                {
                    time5.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time6.Date.getDate()&&ndate.getMonth()==time6.Date.getMonth()&&ndate.getFullYear()==time6.Date.getFullYear())
                {
                    time6.Turnover+=parseInt(orders[i]._total);
                }
                if(ndate.getDate()==time7.Date.getDate()&&ndate.getMonth()==time7.Date.getMonth()&&ndate.getFullYear()==time7.Date.getFullYear())
                {
                    time7.Turnover+=parseInt(orders[i]._total);
                }
            }
            var statistical=1;
            res.render('statisticals/turnover',{statistical,
                t1:time1.Turnover,
                t2:time2.Turnover,
                t3:time3.Turnover,
                t4:time4.Turnover,
                t5:time5.Turnover,
                t6:time6.Turnover,
                t7:time7.Turnover,admin:req.session.admin
            })
        });
    }
    else
    {
        res.redirect("/accounts/login");
    }
    }
    product(req,res)
    {
        if(req.session.admin){
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
                        name:products[i]._nameproduct,
                        procedure:products[i]._procedure,
                        price:products[i]._price,
                        turnover:products[i]._price*result,
                        amount:result,
                        id:products[i]._id,
                    }
                    statistical.push(data);
                    if(i==products.length-1)
                    {
                        var h=1
                        statistical.push(h);
                        res.render('statisticals/product',{statisticals:statistical.sort(function(a, b){return a.amount - b.amount}).slice(-11,-1).reverse(),admin:req.session.admin})
                    }
                })
            }
        
        })}
        else
        {
            res.redirect("/accounts/login");
        }
    }
}
module.exports = new StatisticalsController();