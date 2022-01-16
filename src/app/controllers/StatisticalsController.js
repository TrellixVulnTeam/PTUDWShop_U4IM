const Order=require('../models/Order')
const Product=require('../models/Product')
const Orderdetail=require('../models/Orderdetail')
class StatisticalsController {
    product(req,res)
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
    order(req,res)
    {
        Orderdetail.find({})
        .lean()
        .then((details)=>console.log(details));
        var status=req.query.t;

    }
}
module.exports = new StatisticalsController();