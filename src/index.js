const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes/index.js');
const db = require('./config/db/Product.js');

const app = express();
const port = process.env.PORT||3000;
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
