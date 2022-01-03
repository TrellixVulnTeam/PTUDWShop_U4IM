class MainController {

    show(req, res) {
        res.render('main/zero');
    }
}

module.exports = new MainController();