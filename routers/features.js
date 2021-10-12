const express = require('express');
const router = express.Router();
const Club = require('../models/clubs')
const Reading = require('../models/currentlyReading');
const HaveRead = require("../models/haveRead");
const WillRead = require("../models/willRead");


const catchAsync  = require('../utilities/catchAsync');


router.get('/clubs/:id/currently_reading',catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'currently_reading'
        })
    // console.log(club)
    res.render('feautres/currently_reading', {club});
}));


router.get('/clubs/:id/have_read',catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'have_read'
        })
    // console.log(club)
    res.render('feautres/have_read', {club});
}));



router.get('/clubs/:id/will_read',catchAsync( async(req, res)=>{
    const {id} = req.params
    const club = await Club.findById(id)
        .populate({
            path:'will_read'
        })
    // console.log(club)
    res.render('feautres/will_read', {club});
}));



router.post('/clubs/:id/currently_reading', catchAsync(async(req, res)=>{
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



router.post('/clubs/:id/have_read', catchAsync(async(req, res)=>{
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


router.post('/clubs/:id/will_read', catchAsync(async(req, res)=>{
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


module.exports = router