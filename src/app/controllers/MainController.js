class MainController {

    show(req, res) {
        res.render('layouts/main/zero');
    }
}

module.exports = new MainController();