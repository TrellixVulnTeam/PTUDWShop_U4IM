const Account=require('../models/Account')
const Information=require('../models/Information')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { searchInMongoose } = require('../../util/mongoose');
const PAGE_SIZE=4
const log=1
class AccountsController {
    login(req, res) {
        Information.find({})
        .lean()
        .then(infomations=>{
            console.log(infomations);
        })
        res.render('accounts/login');
    }
    check(req,res,next){
        var username=req.body._username;
        var password=req.body._password;

        var sessData = req.session;

        Account.find({_username:username,_password:password})
        .lean()
        .then(account =>{
          if(account.length>=1)
          {
              if(account[0]._permission==true)
                {
              Information.find({_iduser:account[0]._iduser})
              .lean()
              .then(information=>{
                sessData._iduser=information[0]._iduser;
                  sessData._name=information[0]._name;
                  sessData._avatar=information[0]._avatar;
                  res.redirect('/')
              })
              return;
             }
             else
             {
                sessData._message="This website is just for admin";
             }
          }
          else
          {
            sessData._message="Username or Password is incorrect";
          }
            res.render('accounts/login',{data:req.session});
            req.session.destroy();
        })
        .catch(next)
    }
    show(req, res) {
        if(req.session._iduser)
        {
            Information.find({_iduser:req.session._iduser})
             .lean()
             .then(information=>{
                res.render('accounts/info',{data:information[0]});
             })
        }
        else{
            
            res.redirect("/accounts/login");
        }
    }
    adminlist(req, res) {
        if(req.session._iduser)
        {
            Information.find({})
             .lean()
             .then(info=>{
                var informations=[]
                for(let i of infos)
                {
                    if (i._permission==true)
                    {
                        informations.push(i);
                    }
                }
                res.render('accounts/list',{data:req.session,informations});
             })
        }
        else{
            
            res.redirect("/accounts/login");
        }
    }
    save(req, res, next) {
        Information.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                req.session._name=req.body._name;
                req.session._avatar=req.body._avatar;
                res.redirect('/')})
            .catch(next);
    }
}
module.exports = new AccountsController();