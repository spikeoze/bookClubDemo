const Club = require('./models/clubs');
const Reading = require('./models/currentlyReading');
const HaveRead = require("./models/haveRead");
const WillRead = require("./models/willRead");


module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl     
        return res.redirect('/login')
    }
    next();
}


module.exports.isAuthor = (req, res, next)=>{
    const {id} = req.params;
    const club = Club.findById(id);
    if(!club.author.equals(req.user._id)){
        req.render('error.ejs')
    }
    next();
}

