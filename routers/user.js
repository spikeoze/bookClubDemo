const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const catchAsync  = require('../utilities/catchAsync');


router.get('/register', (req, res)=>{
    res.render('user/register')
})

router.post('/register', catchAsync(async(req, res)=>{
    const {username, email, password} = req.body;
    const user =  new User({username, email});
    const registerUser = await User.register(user, password);
    req.login(registerUser, err=>{
        if(err) return err
        res.redirect('/clubs')
    });

    // console.log(registerUser);
}))

router.get('/login', (req, res)=>{
    res.render('user/login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }),
(req, res)=>{
    // console.log(req.user);
    res.redirect(req.session.returnTo || "/clubs");
    // console.log(req.session.returnTo);
    delete req.session.returnTo;
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
})


module.exports = router