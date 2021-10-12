const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const {isLoggedIn} = require('./middlewere');

const expressError = require('./utilities/expressError');

const clubsRouter = require('./routers/clubs');
const userRouter = require('./routers/user');
const featureRouter = require('./routers/features');

const User = require('./models/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookClubDemo')
    .then(()=>{
        console.log('Database Connected');
    })
    .catch((err)=>{
        console.log('Database Connection Error', err);
})

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));

//! Session 
const sessionConfig = {
    secret:'thisShouldBeASecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        HttpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }

}
app.use(session(sessionConfig));


//! passport config

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//! Local Variables

app.use((req, res, next)=>{
    if(!['/login'].includes(req.originalUrl)){
    req.session.previousReturnTo = req.session.returnTo;
    req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    next();
})

app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
  
    return next();
  
});

//! Home page

app.get('/', (req, res)=>{
    res.render('home');
})


//! Club Routes
app.get('/create', isLoggedIn, (req, res)=>{
    // console.log(req.session.previousReturnTo)
    // console.log(req.session.returnTo)
    res.render('clubs/create-club');
});
// app.use('/', createRouter);

app.use('/clubs', clubsRouter);

//! Feautres Routes
app.use('/', featureRouter);

//! Auth Routes
app.use('/', userRouter);



//! Error handling

app.get('*', (req, res, next)=>{
    next(new expressError('404 Page not found', 404));
    console.log(Error().message)
})






app.listen('4000', ()=>{
    console.log('Listning on port 4000')
})