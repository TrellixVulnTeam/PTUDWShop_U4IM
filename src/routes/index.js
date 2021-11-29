const newsRouter = require('./products.js');
const mainRouter=require('./main.js')
function route(app) {
    app.use('/products', newsRouter);
    app.use('/',mainRouter);
}

module.exports = route;