const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const env = require('./env.json');
const flash = require('connect-flash');

// Init app
const app = express();

//importing routes
const indexRoutes = require('./src/routes/index');
const userRoutes = require('./src/routes/user');
const notesRoutes = require('./src/routes/notes');

//Settings
app.set('port', process.env.PORT || env.port);
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//importing and init database 
require('./src/config/database');


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Routes
app.use(indexRoutes);
app.use(userRoutes );
app.use(notesRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log(`server running in ${ env.host }:${ app.get('port') }`);
});

