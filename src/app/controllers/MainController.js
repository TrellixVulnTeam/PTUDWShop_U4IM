class MainController {

    show(req, res) {
        if(req.session.admin)
        {
            res.render('main/zero',{admin:req.session.admin});
        }
        else
        {
            
            res.redirect("/accounts/login");
        }
    }
}

module.exports = new MainController();