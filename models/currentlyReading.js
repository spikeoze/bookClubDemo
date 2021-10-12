const mongoose = require('mongoose');
const {Schema} = mongoose;



const currentlyReadingSchema = new Schema({
    book_name: String,
});


module.exports = mongoose.model('Reading', currentlyReadingSchema);