const Account=require('../models/Account')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { searchInMongoose } = require('../../util/mongoose');
const PAGE_SIZE=4
const log=1
class AccountsController {
    login(req, res) {
        res.render('accounts/login');
    }
    check(req,res){
        
    }
}
module.exports = new AccountsController();