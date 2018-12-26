const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    power: String,
    seats: Number,
    imgUrl: String,

});


module.exports = mongoose.model('Car', carSchema);
