const mongoose = require('mongoose');
const {Schema} = mongoose;



const haveReadSchema = new Schema({
    book_name: String,
});


module.exports = mongoose.model('HaveRead', haveReadSchema);