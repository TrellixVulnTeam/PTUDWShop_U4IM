const Account=require('../models/Account')

var nodemailer = require('nodemailer');

const option = {
    service: 'gmail',
    auth: {
        user: 'ptudwshop20212022@gmail.com', // email hoặc username
        pass: 'Leminhduc0505@' // password
    }
};

const PAGE_SIZE=4
class AccountsController {
    login(req, res) {
        res.render('accounts/login');
    }    
    out(req, res) {
        req.session.destroy();
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
                        var password = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                       
                        for (var i = 0; i < 8; i++)
                          password += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var transporter = nodemailer.createTransport(option);
                        transporter.verify(function(error, success) {
                            // Nếu có lỗi.
                            if (error) {
                                console.log(error);
                            } else { //Nếu thành công.
                                console.log('Kết nối thành công!');
                            }
                        });
                        var mail = {
                            from: 'ptudwshop20212022@gmail.com', // Địa chỉ email của người gửi
                            to: req.body._email, // Địa chỉ email của người gửi
                            subject: 'Chào mừng admin mới', // Tiêu đề mail
                            text: 'Mật khẩu mặc định của bạn là'+password, // Nội dung mail dạng text
                        };
                        //Tiến hành gửi email
                        transporter.sendMail(mail, function(error, info) {
                            if (error) { // nếu có lỗi
                                console.log(error);
                            } else { //nếu thành công
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        const account = new Account(
                            req.body
                            );
                            account._password=password;
                        account
                            .save()
                            .then(()=>res.redirect('/accounts/admin-list'))
                    }
                })
    }
    save(req, res, next) {
        console.log(req.body)
        if(req.body._password!=req.body._password2)
        {
            var wmessage="The Password and Repeat password is not the same";
            res.render('accounts/info',{admin:req.session.admin,wmessage});
        }
        else
        {
        Account.updateOne({ _id: req.session.admin._id }, req.body)
            .then(() => {
                req.session.admin=req.body;
                res.redirect('/')})
            .catch(next);
        }
    }
}
module.exports = new AccountsController();