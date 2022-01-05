class MainController {

    show(req, res) {
        if(req.session._iduser)
        {
            res.render('main/zero',{data:req.session});
        }
        else
        {
            
            res.redirect("/accounts/login");
        }
    }
}

module.exports = new MainController();