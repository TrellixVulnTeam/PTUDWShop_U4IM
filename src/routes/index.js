const productsRouter = require('./products.js');
const mainRouter=require('./main.js')
const accountsRouter=require('./accounts.js')
function route(app) {
    app.use('/products', productsRouter);
    app.use('/accounts', accountsRouter);
    app.use('/',mainRouter);
}

module.exports = route;