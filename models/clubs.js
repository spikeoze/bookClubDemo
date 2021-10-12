const mongoose = require('mongoose');
const {Schema} = mongoose
const Reading = require('../models/currentlyReading');
const HaveRead = require('../models/haveRead');
const WillRead = require('../models/willRead');



const clubSchema = new Schema({
    name: {
        type: String,
        required: true   
    },
    club_title: {
        type: String,
        required: true   
    },
    
    currently_reading:[{
        type: Schema.Types.ObjectId,
        ref: 'Reading'
    }],

    have_read:[{
        type: Schema.Types.ObjectId,
        ref: 'HaveRead'
    }],

    will_read:[{
        type: Schema.Types.ObjectId,
        ref: 'WillRead'
    }],

    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }


});



clubSchema.post('findOneAndDelete', async function (doc) {

    if(doc){
        await Reading.deleteMany({
            _id:{
                // $in:[doc.currently_reading, doc.have_read, doc.will_read  ]
                $in: doc.currently_reading

            }
        })
    }
    console.log(doc);
})



clubSchema.post('findOneAndDelete', async function (doc) {

    if(doc){
        await HaveRead.deleteMany({
            _id:{
                $in:doc.have_read 
            }
        })
    }
    console.log(doc);
})


clubSchema.post('findOneAndDelete', async function (doc) {

    if(doc){
        await WillRead.deleteMany({
            _id:{
                $in:doc.will_read
            }
        })
    }
    console.log(doc);
})


// console.log(clubSchema)

module.exports = mongoose.model('Club', clubSchema); 