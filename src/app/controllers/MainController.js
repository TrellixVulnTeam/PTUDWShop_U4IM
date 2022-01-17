class MainController {

    show(req, res) {
        if(req.session.admin)
        {
            var statistical=1;
            res.render('main/zero',{admin:req.session.admin,statistical});
        }
        else
        {  
            res.redirect("/accounts/login");
        }
    }
}

module.exports = new MainController();