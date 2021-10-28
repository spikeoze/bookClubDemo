const express = require('express');
const router = express.Router();
const Club = require('../models/clubs')
const Reading = require('../models/currentlyReading');
const HaveRead = require("../models/haveRead");
const WillRead = require("../models/willRead");

const {isLoggedIn} = require('../middlewere');
const catchAsync  = require('../utilities/catchAsync');





// GET REQUESTS



// currently_reading

router.get('/clubs/:id/currently_reading' ,isLoggedIn ,catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'currently_reading'
        })
    // console.log(club)
    res.render('feautres/currently_reading', {club});
}));



// have read

router.get('/clubs/:id/have_read',isLoggedIn ,catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'have_read'
        })
    // console.log(club)
    res.render('feautres/have_read', {club});
}));


// will read


router.get('/clubs/:id/will_read',isLoggedIn ,catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'will_read'
        })
    // console.log(club)
    res.render('feautres/will_read', {club});
}));



// POST REQUESTS



//currently reading
router.post('/clubs/:id/currently_reading',isLoggedIn , catchAsync(async(req, res)=>{
    const {id} = req.params;
    const club = await Club.findById(id);
    const book = new Reading(req.body.reading);
    club.currently_reading.push(book)
    await club.save();
    await book.save();
    // console.log(club)
    // console.log(book)
    // console.log(req.body)
    res.redirect(`/clubs/${club._id}/currently_reading`);
}));



// Have Read

router.post('/clubs/:id/have_read',isLoggedIn ,catchAsync(async(req, res)=>{
    const {id} = req.params;
    const club = await Club.findById(id);
    const book = new HaveRead(req.body.have_read);
    club.have_read.push(book)
    await club.save();
    await book.save();
    // console.log(club)
    // console.log(book)
    // console.log(req.body)
    res.redirect(`/clubs/${club._id}/have_read`);
}));


// Will Read

router.post('/clubs/:id/will_read',isLoggedIn , catchAsync(async(req, res)=>{
    const {id} = req.params;
    const club = await Club.findById(id);
    const book = new WillRead(req.body.will_read);
    club.will_read.push(book)
    await club.save();
    await book.save();
    // console.log(club)
    // console.log(book)
    // console.log(req.body)
    res.redirect(`/clubs/${club._id}/will_read`);
}));









// DELETE REQUESTS


//currently reading

router.delete('/clubs/:id/currently_reading/:bookId',isLoggedIn , catchAsync(async(req, res)=>{
    const {id, bookId } = req.params;
    await Club.findByIdAndUpdate(id, {$pull:{currently_reading: bookId }});
    await Reading.findByIdAndDelete(bookId);
    res.redirect(`/clubs/${id}/currently_reading`);
}));


// have read

router.delete('/clubs/:id/have_read/:bookId',isLoggedIn , catchAsync(async(req, res)=>{
    const {id, bookId } = req.params;
    await Club.findByIdAndUpdate(id, {$pull:{have_read: bookId }});
    await HaveRead.findByIdAndDelete(bookId);
    res.redirect(`/clubs/${id}/have_read`);
}));



// will read

router.delete('/clubs/:id/will_read/:bookId',isLoggedIn , catchAsync(async(req, res)=>{
    const {id, bookId } = req.params;
    await Club.findByIdAndUpdate(id, {$pull:{will_read: bookId }});
    await WillRead.findByIdAndDelete(bookId);
    res.redirect(`/clubs/${id}/will_read`);
}));




module.exports = router