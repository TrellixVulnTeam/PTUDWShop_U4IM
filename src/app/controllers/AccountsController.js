const Account=require('../models/Account')


const PAGE_SIZE=4
class AccountsController {
    login(req, res) {
        res.render('accounts/login');
    }    
    out(req, res) {
        res.redirect('/accounts/login');
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
                sessData.admin=account[0];
                res.redirect('/');
                return;
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
        if(req.session.admin)
        {
                res.render('accounts/info',{admin:req.session.admin});
        }
        else{
            
            res.redirect("/accounts/login");
        }
    }
    adminlist(req, res) {
        if(req.session.admin)
        {
            Account.find({})
             .lean()
             .then(accounts=>{
                 res.render("accounts/list",{admin:req.session.admin,admins:accounts}
                 );
             })
        }
        else{
           res.redirect("/accounts/login");
        }
    }
    adminadd(req, res) {
        if(req.session.admin)
        {
            res.render('accounts/add/admin',{admin:req.session.admin})
        }
        else{
           res.redirect("/accounts/login");
        }
    }
    adminstore(req, res) {
        if(req.body._password!=req.body._password2)
        {
            req.session.wmessage="The Password and Repeat password is not the same";
            res.render('accounts/add/admin',{admin:req.session.admin,data:req.session});
        }
        else
        {
            if(req.body._password.length<=8)
            {
                req.session.wmessage="The minimum length of password is 8";
                res.render('accounts/add/admin',{admin:req.session.admin,data:req.session});
            }
            else
            {
                var t;
                Account.find({_username:req.body._username})
                .lean()
                .then(account=>{
                    if (account.length>=1)
                    {
                        req.session.wmessage="The username is exist";
                        res.render('accounts/add/admin',{admin:req.session.admin,data:req.session});
                    }
                    else
                    {
                        const account = new Account(
                            req.body
                            );
                        account
                            .save()
                            .then(()=>res.redirect('/accounts/admin-list'))
                    }
                })
            }
        }
    }
    save(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                req.session.admin=req.body;
                res.redirect('/')})
            .catch(next);
    }
}
module.exports = new AccountsController();