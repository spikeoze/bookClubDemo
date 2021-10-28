const express = require('express');
const Club = require('../models/clubs');
const router = express.Router();

const {isLoggedIn, isAuthor} = require('../middlewere');


const catchAsync  = require('../utilities/catchAsync');

router.post('/',isLoggedIn , catchAsync( async(req, res)=>{
    const club = new Club(req.body.club);
    club.author = req.user._id;
    await club.save()
    // console.log(req.body.club)
    // console.log(club)
    res.redirect('/clubs');
}));

router.get('/', isLoggedIn, isAuthor ,catchAsync(async(req, res)=>{
    // const {id} = req.params
    const clubs = await Club.find({});
    // console.log(clubs)
    // console.log(req.user._id);
    res.render('clubs/index.ejs', {clubs});
}));


router.get('/:id',isLoggedIn, isAuthor, catchAsync(async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'currently_reading'
        })
        .populate({
            path:'have_read'
        })
        .populate({
            path:'will_read'
        })
        
    //  console.log(club)
    res.render('clubs/show.ejs', {club})

}));


router.delete('/:id',isLoggedIn, isAuthor, catchAsync(async(req, res)=>{
    const {id} = req.params;
    const club = await Club.findByIdAndDelete(id);
    res.redirect('/clubs');
}));


module.exports = router