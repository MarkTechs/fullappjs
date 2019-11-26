const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const sessions = require('express-session');

//inits

const app = express();
require('./database');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),  'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs' 
}));

app.set('view engine', '.hbs');


//middlewares configuration somethings specials of servers
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(sessions({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


//Global variables

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/diario'));

//Statis files.

app.use(express.static(path.join(__dirname, 'public')));
//Server listenig
app.listen(app.get('port'), () =>{

    console.log('Server on port ', app.get('port'));
});
