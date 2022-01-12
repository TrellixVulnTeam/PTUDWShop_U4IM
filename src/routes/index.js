const productsRouter = require('./products.js');
const mainRouter=require('./main.js')
const accountsRouter=require('./accounts.js')
const customersRouter=require('./customers.js')
const ordersRouter=require('./orders.js')
function route(app) {
    app.use('/products', productsRouter);
    app.use('/accounts', accountsRouter);
    app.use('/customers', customersRouter);
    app.use('/orders', ordersRouter);
    app.use('/',mainRouter);
}

module.exports = route;