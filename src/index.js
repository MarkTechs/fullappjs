const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const sessions = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//inits

const app = express();
require('./database');
require('./config/passport');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 
    next();

});
//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/diario'));

//Statis files.

app.use(express.static(path.join(__dirname, 'public')));

app.get("/manifest.json", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/cache-manifest");
    //console.log(path.join(__dirname,"manifest.json"));
    //send the manifest file
    //to be parsed bt express
    res.sendFile(path.join(__dirname,"manifest.json"));
  });

//add the service worker
app.get("/serviceWorker.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"serviceWorker.js"));
  });

app.get("/loader.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"loader.js"));
  });



//Server listenig
app.listen(app.get('port'), () =>{

    console.log('Server on port ', app.get('port'));
});



