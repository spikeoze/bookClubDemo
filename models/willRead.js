const mongoose = require('mongoose');
const {Schema} = mongoose;



const willReadSchema = new Schema({
    book_name: String,
});


module.exports = mongoose.model('WillRead', willReadSchema);